import { NextResponse } from 'next/server';
import { PlayerStats, APIResponse } from '@/app/types/player';

const CACHE_DURATION = 3600; // 1 hour

export async function GET() {
  try {
    const response = await fetch(`${process.env.BALLDONTLIE_BASE_URL}/stats`, {
      headers: {
        'Authorization': `Bearer ${process.env.BALLDONTLIE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const result: APIResponse<PlayerStats[]> = await response.json();
    
    // Create the response with appropriate cache headers
    const responseJson = NextResponse.json({
      data: result.data,
      metadata: {
        season: result.metadata?.season || 2023,
        last_updated: result.metadata?.timestamp || new Date().toISOString(),
        cached: result.metadata?.cached || false,
      }
    });

    responseJson.headers.set(
      'Cache-Control',
      `s-maxage=${CACHE_DURATION}, stale-while-revalidate`
    );

    return responseJson;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 