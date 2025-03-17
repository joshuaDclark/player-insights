import { NextResponse } from 'next/server';
import { PlayerStats } from '@/app/types/player';

// This is mock data - replace with your actual data fetching logic
const mockPlayerStats: PlayerStats[] = [
  {
    player_id: 1,
    player_name: 'LaMelo Ball',
    position: 'PG',
    pts: 23.9,
    reb: 6.4,
    ast: 8.4,
    fg_pct: 0.442,
    fg3_pct: 0.376,
    min: '35:12'
  },
  {
    id: '2',
    name: 'Brandon Miller',
    pointsPerGame: 16.8,
    rebounds: 4.2,
    assists: 2.4,
    fieldGoalPercentage: 43.8,
    threePointPercentage: 38.2,
    minutesPlayed: 32.8,
  },
  {
    id: '3',
    name: 'Miles Bridges',
    pointsPerGame: 21.2,
    rebounds: 7.4,
    assists: 3.2,
    fieldGoalPercentage: 45.7,
    threePointPercentage: 35.6,
    minutesPlayed: 35.1,
  },
  {
    id: '4',
    name: 'Nick Richards',
    pointsPerGame: 9.8,
    rebounds: 8.2,
    assists: 0.8,
    fieldGoalPercentage: 68.5,
    threePointPercentage: 0.0,
    minutesPlayed: 27.4,
  },
  {
    id: '5',
    name: 'Grant Williams',
    pointsPerGame: 12.5,
    rebounds: 4.8,
    assists: 1.9,
    fieldGoalPercentage: 42.8,
    threePointPercentage: 37.5,
    minutesPlayed: 29.6,
  },
  {
    id: '6',
    name: 'Tre Mann',
    pointsPerGame: 8.7,
    rebounds: 2.3,
    assists: 2.8,
    fieldGoalPercentage: 39.2,
    threePointPercentage: 34.8,
    minutesPlayed: 20.5,
  }
];

export async function GET() {
  try {
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      data: mockPlayerStats
    });
  } catch (error) {
    console.error('Error in /api/players/stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player statistics' },
      { status: 500 }
    );
  }
} 