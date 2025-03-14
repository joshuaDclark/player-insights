import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";

// Ensure the API key is a string, or throw an error at runtime
const apiKey = process.env.BALLDONTLIE_API_KEY as string;
if (!apiKey) {
  throw new Error("Missing BALLDONTLIE_API_KEY in environment variables.");
}

const api = new BalldontlieAPI({ apiKey });
console.log("API Key:", process.env.BALLDONTLIE_API_KEY);

export async function GET() {
  try {
    const players = await api.nba.getPlayers({ team_ids: [2] }); // Fetch Charlotte Hornets players
    return NextResponse.json(players.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch player data" }, { status: 500 });
  }
}
