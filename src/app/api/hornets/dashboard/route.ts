import { NextResponse } from 'next/server';
import { PlayerStats } from '@/app/types/player';
import { getMockStatsById, generateMockStats } from '@/app/api/mocks/playerStats';

const CACHE_DURATION = 3600; // 1 hour
const BASE_URL = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALLDONTLIE_API_KEY;

export async function GET() {
  try {
    // Fetch real player data from balldontlie API
    const playersResponse = await fetch(
      `${BASE_URL}/players?per_page=100&team_ids[]=1`, // 1 is the Hornets team ID
      {
        headers: {
          'Authorization': API_KEY || ''
        }
      }
    );

    if (!playersResponse.ok) {
      throw new Error(`Failed to fetch players: ${playersResponse.status}`);
    }

    const playersData = await playersResponse.json();
    
    if (!playersData.data || !Array.isArray(playersData.data)) {
      throw new Error('Invalid player data format');
    }

    // Combine real player data with mock stats
    const playerStats: PlayerStats[] = playersData.data.map((player: any) => {
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
        data_source: 'Hybrid - Real player data with mock statistics'
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