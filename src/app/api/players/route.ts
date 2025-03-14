import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";
import type { PlayerStats } from '@/app/types/player';

// Ensure the API key is a string, or throw an error at runtime
const apiKey = process.env.BALLDONTLIE_API_KEY as string;
if (!apiKey) {
  throw new Error("Missing BALLDONTLIE_API_KEY in environment variables.");
}

const api = new BalldontlieAPI({ apiKey });
console.log("API Key:", process.env.BALLDONTLIE_API_KEY);

const mockPlayerStats: PlayerStats[] = [
  {
    id: '1',
    name: 'LaMelo Ball',
    pointsPerGame: 23.9,
    rebounds: 6.4,
    assists: 8.2,
    fieldGoalPercentage: 44.2,
    threePointPercentage: 37.8,
    minutesPlayed: 33.5,
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
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json({ data: mockPlayerStats });
  } catch (err) {
    console.error('Error in /api/players/stats:', err);
    return NextResponse.json(
      { error: 'Failed to fetch player statistics' },
      { status: 500 }
    );
  }
}
