import { NextResponse } from 'next/server';

const CACHE_DURATION = 3600; // 1 hour
const CURRENT_SEASON = 2023; // 2023-24 season

interface PlayerStats {
  player_id: number;
  player_name: string;
  games_played: number;
  points: number;
  rebounds: number;
  assists: number;
  fg_pct: number;
  fg3_pct: number;
  minutes: string;
}

interface DashboardData {
  leaderboards: {
    points: PlayerStats[];
    rebounds: PlayerStats[];
    assists: PlayerStats[];
    fg_pct: PlayerStats[];
    minutes: PlayerStats[];
  };
  shootingEfficiency: {
    player_name: string;
    fg_pct: number;
    fg3_pct: number;
  }[];
  allPlayers: PlayerStats[];
  metadata: {
    season: number;
    last_updated: string;
    cached: boolean;
  };
}

export async function GET() {
  try {
    // Fetch data from our hybrid endpoint
    const statsResponse = await fetch('http://localhost:3000/api/test/hornets/stats');

    if (!statsResponse.ok) {
      throw new Error(`Stats API error: ${statsResponse.status}`);
    }

    const statsData = await statsResponse.json();
    
    // Transform the hybrid endpoint data into our dashboard format
    const playerStats: PlayerStats[] = statsData.data.players.map((player: any) => ({
      player_id: player.player_id,
      player_name: player.player_name,
      games_played: player.stats.games_played || 0,
      points: player.stats.pts || 0,
      rebounds: player.stats.reb || 0,
      assists: player.stats.ast || 0,
      fg_pct: (player.stats.fg_pct || 0) * 100, // Convert to percentage
      fg3_pct: (player.stats.fg3_pct || 0) * 100, // Convert to percentage
      minutes: player.stats.min || '0',
    }));

    // Create dashboard data structure
    const dashboardData: DashboardData = {
      leaderboards: {
        points: [...playerStats].sort((a, b) => b.points - a.points).slice(0, 5),
        rebounds: [...playerStats].sort((a, b) => b.rebounds - a.rebounds).slice(0, 5),
        assists: [...playerStats].sort((a, b) => b.assists - a.assists).slice(0, 5),
        fg_pct: [...playerStats]
          .filter(player => player.games_played >= 10) // Minimum games played filter
          .sort((a, b) => b.fg_pct - a.fg_pct)
          .slice(0, 5),
        minutes: [...playerStats]
          .sort((a, b) => {
            const aMin = parseFloat(a.minutes.split(':')[0]) || 0;
            const bMin = parseFloat(b.minutes.split(':')[0]) || 0;
            return bMin - aMin;
          })
          .slice(0, 5),
      },
      shootingEfficiency: playerStats.map(player => ({
        player_name: player.player_name,
        fg_pct: player.fg_pct,
        fg3_pct: player.fg3_pct,
      })),
      allPlayers: playerStats,
      metadata: {
        season: CURRENT_SEASON,
        last_updated: statsData.metadata?.timestamp || new Date().toISOString(),
        cached: statsData.metadata?.cached || false,
      },
    };

    // Create the response with appropriate cache headers
    const response = NextResponse.json(dashboardData);
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