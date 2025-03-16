import { NextResponse } from 'next/server';
import { BalldontlieAPI } from "@balldontlie/sdk";

const API_KEY = process.env.BALLDONTLIE_API_KEY;

/**
 * GET handler for /api/test
 * Simple endpoint to test connectivity with the Balldontlie API
 */
export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error('API key not configured. Please set BALLDONTLIE_API_KEY environment variable.');
    }

    const api = new BalldontlieAPI({ apiKey: API_KEY });

    // Make a simple request to get teams using the SDK
    const teams = await api.nba.getTeams();
    
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Balldontlie API',
      data: teams,
      metadata: {
        timestamp: new Date().toISOString(),
        endpoint: 'getTeams',
        version: 'v2'
      }
    });
  } catch (error) {
    console.error('Failed to connect to Balldontlie API:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to Balldontlie API',
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          timestamp: new Date().toISOString(),
          endpoint: 'getTeams',
          version: 'v2'
        }
      },
      { status: 500 }
    );
  }
} 