import { PlayerStats, PlayerStatsError } from '../types/player';

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
let cache: { data: PlayerStats[] | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

export async function fetchPlayerStats(): Promise<{
  data: PlayerStats[] | null;
  error: PlayerStatsError | null;
}> {
  try {
    // Check cache validity
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_TIME) {
      return { data: cache.data, error: null };
    }

    const response = await fetch('/api/players/stats', {
      next: { revalidate: 300 }, // 5 minutes revalidation
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Update cache
    cache = {
      data: data.data,
      timestamp: now,
    };

    return { data: data.data, error: null };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Failed to fetch player stats',
        code: 'FETCH_ERROR',
      },
    };
  }
} 