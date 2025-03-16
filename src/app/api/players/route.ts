import { NextResponse } from 'next/server';
import { BalldontlieService } from '@/app/services/balldontlieService';

// Initialize the service
const balldontlieService = new BalldontlieService();

/**
 * GET handler for /api/players/stats
 * Returns player statistics from the Balldontlie service with caching and rate limiting
 */
export async function GET() {
  try {
    const playerStats = await balldontlieService.getPlayerStats();
    
    return NextResponse.json({
      data: playerStats,
      timestamp: new Date().toISOString(),
      cached: false // The service handles caching internally
    });
  } catch (err) {
    console.error('Failed to fetch player stats:', err);
    
    let errorMessage = 'Failed to fetch player stats';
    let statusCode = 500;

    // Handle specific error cases
    if (err instanceof Error) {
      if (err.message.includes('Rate limit exceeded')) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
        statusCode = 429;
      } else if (err.message.includes('abort')) {
        errorMessage = 'Request timed out. Please try again.';
        statusCode = 408;
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}
