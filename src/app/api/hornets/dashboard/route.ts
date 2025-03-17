import { NextResponse } from 'next/server';
import { PlayerStats } from '@/app/types/player';
import { getMockStatsById, generateMockStats } from '@/app/api/mocks/playerStats';

const CACHE_DURATION = 3600; // 1 hour
const BASE_URL = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALLDONTLIE_API_KEY;

// Fallback mock players data
const mockPlayers = [
  { id: 1, first_name: 'LaMelo', last_name: 'Ball', position: 'G' },
  { id: 2, first_name: 'Brandon', last_name: 'Miller', position: 'F' },
  { id: 3, first_name: 'Miles', last_name: 'Bridges', position: 'F' },
  { id: 4, first_name: 'Gordon', last_name: 'Hayward', position: 'F' },
  { id: 5, first_name: 'Mark', last_name: 'Williams', position: 'C' },
  { id: 6, first_name: 'Terry', last_name: 'Rozier', position: 'G' },
  { id: 7, first_name: 'PJ', last_name: 'Washington', position: 'F' },
  { id: 8, first_name: 'Cody', last_name: 'Martin', position: 'F' },
  { id: 9, first_name: 'Frank', last_name: 'Ntilikina', position: 'G' },
  { id: 10, first_name: 'Davis', last_name: 'Bertans', position: 'F' }
];

export async function GET() {
  try {
    // Fetch real player data from balldontlie API
    console.log('Attempting to fetch players from balldontlie API...');
    const playersResponse = await fetch(
      `${BASE_URL}/players?per_page=100&team_ids[]=1`, // 1 is the Hornets team ID
      {
        headers: {
          'Authorization': API_KEY || ''
        }
      }
    );

    if (!playersResponse.ok) {
      console.error('API Response not OK:', {
        status: playersResponse.status,
        statusText: playersResponse.statusText,
        headers: Object.fromEntries(playersResponse.headers.entries())
      });
      throw new Error(`Failed to fetch players: ${playersResponse.status}`);
    }

    const playersData = await playersResponse.json();
    console.log('Received players data:', {
      dataLength: playersData.data?.length,
      hasData: !!playersData.data,
      isArray: Array.isArray(playersData.data)
    });
    
    let playersToProcess;
    if (!playersData.data || !Array.isArray(playersData.data) || playersData.data.length === 0) {
      console.log('No valid player data from API, falling back to mock data');
      playersToProcess = mockPlayers;
    } else {
      playersToProcess = playersData.data;
    }

    // Combine real player data with mock stats
    const playerStats: PlayerStats[] = playersToProcess.map((player: any) => {
      let mockStats = getMockStatsById(player.id);
      if (!mockStats) {
        mockStats = generateMockStats(
          player.id,
          `${player.first_name} ${player.last_name}`,
          player.position
        );
      }

      return {
        player_id: player.id,
        player_name: `${player.first_name} ${player.last_name}`,
        position: player.position || 'N/A',
        pts: mockStats.stats.pts,
        ast: mockStats.stats.ast,
        reb: mockStats.stats.reb,
        fg_pct: mockStats.stats.fg_pct,
        fg3_pct: mockStats.stats.fg3_pct,
        min: mockStats.stats.min
      };
    });

    return NextResponse.json({
      data: playerStats,
      metadata: {
        season: 2023,
        last_updated: new Date().toISOString(),
        cached: true,
        data_source: playersToProcess === mockPlayers ? 'Mock Data' : 'Hybrid - Real player data with mock statistics'
      }
    }, {
      status: 200,
      headers: {
        'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
} 