import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALLDONTLIE_API_KEY;

/**
 * GET handler for /api/test/season-averages
 * Simple test to fetch season averages for LaMelo Ball (ID: 666956)
 */
export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error('API key not configured. Please set BALLDONTLIE_API_KEY environment variable.');
    }

    // Using LaMelo Ball's ID as a test case
    const playerId = 666956;
    const season = 2023;

    console.log(`Testing season averages endpoint for player ${playerId}, season ${season}...`);
    
    const response = await fetch(
      `${BASE_URL}/season_averages?season=${season}&player_ids[]=${playerId}`,
      {
        headers: {
          'Authorization': API_KEY
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Season averages error:', errorText);
      throw new Error(`Season averages HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Season averages response:', data);

    return NextResponse.json({
      success: true,
      message: 'Successfully retrieved season averages',
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        endpoint: '/season_averages',
        version: 'v1',
        player: 'LaMelo Ball',
        season: season
      }
    });

  } catch (error) {
    console.error('Failed to get season averages:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get season averages',
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          timestamp: new Date().toISOString(),
          endpoint: '/season_averages',
          version: 'v1'
        }
      },
      { status: 500 }
    );
  }
} 