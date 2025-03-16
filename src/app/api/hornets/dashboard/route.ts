import { NextResponse } from 'next/server';
import { PlayerStats } from '@/app/types/player';

const CACHE_DURATION = 3600; // 1 hour

export async function GET() {
  try {
    // Fetch data from our hybrid endpoint
    const statsResponse = await fetch('http://localhost:3000/api/test/hornets/stats');

    if (!statsResponse.ok) {
      throw new Error(`Stats API error: ${statsResponse.status}`);
    }

    const statsData = await statsResponse.json();
    
    if (!statsData.data?.players || !Array.isArray(statsData.data.players)) {
      throw new Error('Invalid data format received from stats API');
    }

    // Transform the hybrid endpoint data into our dashboard format
    const playerStats: PlayerStats[] = statsData.data.players.map((player: any) => ({
      player_id: player.player_id,
      player_name: player.player_name,
      position: player.position || 'N/A',
      pts: player.stats.pts || 0,
      ast: player.stats.ast || 0,
      reb: player.stats.reb || 0,
      fg_pct: player.stats.fg_pct || 0,
      fg3_pct: player.stats.fg3_pct || 0,
      min: player.stats.min || '0',
    }));

    // Create the response with appropriate cache headers
    const response = NextResponse.json({
      data: playerStats,
      metadata: {
        season: statsData.metadata?.season || 2023,
        last_updated: statsData.metadata?.timestamp || new Date().toISOString(),
        cached: statsData.metadata?.cached || false,
      }
    });

    response.headers.set(
      'Cache-Control',
      `s-maxage=${CACHE_DURATION}, stale-while-revalidate`
    );

    return response;
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
} 