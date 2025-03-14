import { NextResponse } from 'next/server';
import { mockPlayerStats } from './mockData';

/**
 * GET handler for /api/players/stats
 * Returns mock player statistics with a simulated delay
 */
export async function GET() {
  try {
    // Simulate network delay for development
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return NextResponse.json({
      data: mockPlayerStats,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error in /api/players/stats:', err);
    return NextResponse.json(
      {
        error: 'Failed to fetch player statistics',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
