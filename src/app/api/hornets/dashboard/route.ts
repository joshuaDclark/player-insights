import { NextResponse } from 'next/server';
import { PlayerStats } from '@/app/types/player';
import { getMockStatsById, generateMockStats } from '@/app/api/mocks/playerStats';

const CACHE_DURATION = 3600; // 1 hour

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
    const playerStats: PlayerStats[] = mockPlayers.map(player => {
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
        position: player.position,
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
        cached: true
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