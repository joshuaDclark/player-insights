import { NextResponse } from 'next/server';
import { PlayerSeasonAverages, getMockStatsById, generateMockStats } from '@/app/api/mocks/playerStats';

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
 * Returns mock statistics for the Hornets
 */
export async function GET() {
  try {
    // Use mock data directly
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
      { id: 10, first_name: 'Davis', last_name: 'Bertans', position: 'F' },
      { id: 11, first_name: 'Amari', last_name: 'Bailey', position: 'G' },
      { id: 12, first_name: 'James', last_name: 'Bouknight', position: 'G' },
      { id: 13, first_name: 'Aleksej', last_name: 'Pokusevski', position: 'F' },
      { id: 14, first_name: 'Leaky', last_name: 'Black', position: 'G' },
      { id: 15, first_name: 'Tre', last_name: 'Scott', position: 'F' },
      { id: 16, first_name: 'Kobi', last_name: 'Simmons', position: 'G' },
      { id: 17, first_name: 'Xavier', last_name: 'Sneed', position: 'F' },
      { id: 18, first_name: 'Jordan', last_name: 'Miller', position: 'F' },
      { id: 19, first_name: 'Marques', last_name: 'Bolden', position: 'C' },
      { id: 20, first_name: 'Jaylen', last_name: 'Sims', position: 'G' },
      { id: 21, first_name: 'Nick', last_name: 'Smith Jr.', position: 'G' },
      { id: 22, first_name: 'Kai', last_name: 'Jones', position: 'C' },
      { id: 23, first_name: 'Seth', last_name: 'Curry', position: 'G' }
    ];

    // Generate mock stats for each player
    const playerStats = mockPlayers.map(player => {
      let mockStats = getMockStatsById(player.id);
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

    return NextResponse.json({
      success: true,
      message: 'Successfully retrieved Hornets statistics',
      data: {
        team: {
          id: 1,
          name: 'Hornets',
          full_name: 'Charlotte Hornets'
        },
        players: playerStats,
        team_averages: averages,
        active_players: playerStats.length
      },
      metadata: {
        timestamp: new Date().toISOString(),
        data_source: 'Mock Data',
        version: 'v1',
        cached: true,
        cache_duration: `${CACHE_DURATION} seconds`,
        next_refresh: new Date(Date.now() + CACHE_DURATION * 1000).toISOString()
      }
    }, {
      status: 200,
      headers: {
        'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Failed to get Hornets statistics:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get Hornets statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          timestamp: new Date().toISOString(),
          data_source: 'Mock Data',
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