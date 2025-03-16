import { NextResponse } from 'next/server';

/**
 * GET handler for /api/test/cache-test
 * Makes a request to our stats endpoint and returns timing information
 */
export async function GET() {
  try {
    const startTime = Date.now();

    // Make request to our stats endpoint
    const response = await fetch('http://localhost:3000/api/test/hornets/stats');
    const data = await response.json();

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return NextResponse.json({
      success: true,
      test_metadata: {
        response_time_ms: responseTime,
        cache_headers: Object.fromEntries(response.headers.entries()),
        timestamp: new Date().toISOString()
      },
      stats_response: data
    });

  } catch (error) {
    console.error('Cache test failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Cache test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 