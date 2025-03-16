import { NextResponse } from 'next/server';
import { BalldontlieAPI } from "@balldontlie/sdk";

const API_KEY = process.env.BALLDONTLIE_API_KEY;

/**
 * GET handler for /api/test/hornets
 * Gets just the Hornets team data to verify we can find them
 */
export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error('API key not configured. Please set BALLDONTLIE_API_KEY environment variable.');
    }

    const api = new BalldontlieAPI({ apiKey: API_KEY });

    // Get all teams and find the Hornets
    const teams = await api.nba.getTeams();
    const hornets = teams.data.find(team => team.name === 'Hornets');
    
    if (!hornets) {
      throw new Error('Could not find Hornets team data');
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully found Hornets team data',
      data: hornets,
      metadata: {
        timestamp: new Date().toISOString(),
        endpoint: 'getTeams',
        version: 'v2'
      }
    });
  } catch (error) {
    console.error('Failed to find Hornets team:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to find Hornets team',
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