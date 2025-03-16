import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALLDONTLIE_API_KEY;

/**
 * GET handler for /api/test/hornets/advanced
 * Simple test to fetch advanced stats
 */
export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error('API key not configured. Please set BALLDONTLIE_API_KEY environment variable.');
    }

    console.log('Testing advanced stats endpoint...');
    
    const response = await fetch(`${BASE_URL}/stats/advanced`, {
      headers: {
        'Authorization': API_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Advanced stats error:', errorText);
      throw new Error(`Advanced stats HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Advanced stats response:', data);

    return NextResponse.json({
      success: true,
      message: 'Successfully retrieved advanced stats',
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        endpoint: '/stats/advanced',
        version: 'v1'
      }
    });

  } catch (error) {
    console.error('Failed to get advanced stats:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get advanced stats',
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          timestamp: new Date().toISOString(),
          endpoint: '/stats/advanced',
          version: 'v1'
        }
      },
      { status: 500 }
    );
  }
} 