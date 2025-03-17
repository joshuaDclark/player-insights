import { NextResponse } from 'next/server';
import { PlayerSeasonAverages, getMockStatsById, generateMockStats } from '@/app/api/mocks/playerStats';

const BASE_URL = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALLDONTLIE_API_KEY;

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

interface TeamAverages {
  points: number;
  rebounds: number;
  assists: number;
  fg_pct: number;
  fg3_pct: number;
  minutes: number;
  count: number;
}

/**
 * GET handler for /api/test/hornets/stats
 * Gets real team/player data and combines it with mock statistics
 */
export async function GET() {
  try {
    if (!API_KEY) {
      console.error('API key is missing');
      throw new Error('API key not configured. Please set BALLDONTLIE_API_KEY environment variable.');
    }

    console.log('API key is present, attempting to fetch data...');

    // Create a Response object with the data
    const response = await generateResponse();

    // Add cache headers
    const headers = {
      'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      'Content-Type': 'application/json',
    };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: headers,
    });

  } catch (error) {
    console.error('Failed to get Hornets statistics:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get Hornets statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          timestamp: new Date().toISOString(),
          data_source: 'Hybrid - Real team/player data with mock statistics',
          version: 'v1',
          cached: false
        }
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

async function generateResponse() {
  console.log('Starting generateResponse...');
  
  // First get the Hornets team
  console.log('Fetching teams data...');
  const teamsResponse = await fetch(`${BASE_URL}/teams`, {
    headers: new Headers({
      'Authorization': API_KEY || ''
    }),
    next: {
      revalidate: CACHE_DURATION
    }
  });
  
  if (!teamsResponse.ok) {
    const errorText = await teamsResponse.text();
    console.error('Teams response error:', {
      status: teamsResponse.status,
      statusText: teamsResponse.statusText,
      body: errorText
    });
    throw new Error(`Teams HTTP error! status: ${teamsResponse.status} - ${errorText}`);
  }

  const teamsData = await teamsResponse.json();
  console.log('Teams data received:', {
    hasData: !!teamsData,
    dataLength: teamsData.data?.length
  });

  const hornets = teamsData.data.find((team: any) => team.name === 'Hornets');
  
  if (!hornets) {
    console.error('Hornets team not found in response:', teamsData);
    throw new Error('Could not find Hornets team data');
  }

  console.log('Found Hornets team:', {
    id: hornets.id,
    name: hornets.name
  });

  // Get all Hornets players
  console.log('Fetching players data...');
  const playersResponse = await fetch(
    `${BASE_URL}/players?per_page=100&team_ids[]=${hornets.id}`,
    {
      headers: new Headers({
        'Authorization': API_KEY || ''
      }),
      next: {
        revalidate: CACHE_DURATION
      }
    }
  );

  if (!playersResponse.ok) {
    const errorText = await playersResponse.text();
    console.error('Players response error:', {
      status: playersResponse.status,
      statusText: playersResponse.statusText,
      body: errorText
    });
    throw new Error(`Players HTTP error! status: ${playersResponse.status} - ${errorText}`);
  }

  const playersData = await playersResponse.json();
  console.log('Players data received:', {
    hasData: !!playersData,
    playerCount: playersData.data?.length
  });
  
  if (!playersData.data || playersData.data.length === 0) {
    console.error('No players found in response:', playersData);
    throw new Error('No players found in Hornets roster');
  }

  // Combine real player data with mock stats
  const playerStats = playersData.data.map((player: any) => {
    // Try to get preset mock stats for known players
    let mockStats = getMockStatsById(player.id);
    
    // If no preset stats, generate realistic mock stats based on position
    if (!mockStats) {
      mockStats = generateMockStats(
        player.id,
        `${player.first_name} ${player.last_name}`,
        player.position
      );
    }

    return mockStats;
  });

  // Calculate team averages
  const teamAverages = playerStats.reduce((acc: TeamAverages, player: PlayerSeasonAverages) => {
    const stats = player.stats;
    return {
      points: acc.points + stats.pts,
      rebounds: acc.rebounds + stats.reb,
      assists: acc.assists + stats.ast,
      fg_pct: acc.fg_pct + stats.fg_pct,
      fg3_pct: acc.fg3_pct + stats.fg3_pct,
      minutes: acc.minutes + parseInt(stats.min.split(':')[0]),
      count: acc.count + 1
    };
  }, { points: 0, rebounds: 0, assists: 0, fg_pct: 0, fg3_pct: 0, minutes: 0, count: 0 });

  const averages = {
    points_per_game: (teamAverages.points / teamAverages.count).toFixed(1),
    rebounds_per_game: (teamAverages.rebounds / teamAverages.count).toFixed(1),
    assists_per_game: (teamAverages.assists / teamAverages.count).toFixed(1),
    field_goal_percentage: (teamAverages.fg_pct / teamAverages.count * 100).toFixed(1) + '%',
    three_point_percentage: (teamAverages.fg3_pct / teamAverages.count * 100).toFixed(1) + '%',
    minutes_per_game: (teamAverages.minutes / teamAverages.count).toFixed(1)
  };

  return {
    success: true,
    message: 'Successfully retrieved Hornets statistics',
    data: {
      team: {
        id: hornets.id,
        name: hornets.name,
        full_name: hornets.full_name
      },
      players: playerStats,
      team_averages: averages,
      active_players: playerStats.length
    },
    metadata: {
      timestamp: new Date().toISOString(),
      data_source: 'Hybrid - Real team/player data with mock statistics',
      version: 'v1',
      cached: true,
      cache_duration: `${CACHE_DURATION} seconds`,
      next_refresh: new Date(Date.now() + CACHE_DURATION * 1000).toISOString()
    }
  };
} 