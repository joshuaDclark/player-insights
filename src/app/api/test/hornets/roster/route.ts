import { NextResponse } from 'next/server';
import { BalldontlieAPI } from "@balldontlie/sdk";

const API_KEY = process.env.BALLDONTLIE_API_KEY;

/**
 * GET handler for /api/test/hornets/roster
 * Gets the current Hornets roster
 */
export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error('API key not configured. Please set BALLDONTLIE_API_KEY environment variable.');
    }

    const api = new BalldontlieAPI({ apiKey: API_KEY });

    // First get the Hornets team ID
    const teams = await api.nba.getTeams();
    const hornets = teams.data.find(team => team.name === 'Hornets');
    
    if (!hornets) {
      throw new Error('Could not find Hornets team data');
    }

    // Get all players for the Hornets
    const players = await api.nba.getPlayers({ 
      team_ids: [hornets.id],
      per_page: 100 // Get maximum players to ensure we get the full roster
    });

    if (!players.data || players.data.length === 0) {
      throw new Error('No players found in Hornets roster');
    }

    // Format the player data for better readability
    const rosterData = players.data.map(player => ({
      id: player.id,
      name: `${player.first_name} ${player.last_name}`,
      position: player.position,
      team: player.team
    }));

    return NextResponse.json({
      success: true,
      message: 'Successfully retrieved Hornets roster',
      data: {
        team: {
          id: hornets.id,
          name: hornets.name,
          full_name: hornets.full_name,
          conference: hornets.conference,
          division: hornets.division
        },
        roster: rosterData,
        roster_size: rosterData.length
      },
      metadata: {
        timestamp: new Date().toISOString(),
        endpoint: 'getPlayers',
        version: 'v2'
      }
    });
  } catch (error) {
    console.error('Failed to get Hornets roster:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get Hornets roster',
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          timestamp: new Date().toISOString(),
          endpoint: 'getPlayers',
          version: 'v2'
        }
      },
      { status: 500 }
    );
  }
} 