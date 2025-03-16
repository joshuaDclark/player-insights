export interface PlayerSeasonAverages {
  player_id: number;
  player_name: string;
  position: string;
  stats: {
    games_played: number;
    min: string;
    pts: number;
    reb: number;
    ast: number;
    fg_pct: number;
    fg3_pct: number;
  };
}

// Mock data with realistic statistics for Hornets players
export const mockPlayerStats: PlayerSeasonAverages[] = [
  {
    player_id: 666956,
    player_name: "LaMelo Ball",
    position: "PG",
    stats: {
      games_played: 58,
      min: "32:30",
      pts: 23.4,
      reb: 6.8,
      ast: 8.0,
      fg_pct: 0.441,
      fg3_pct: 0.375
    }
  },
  {
    player_id: 3547242,
    player_name: "Brandon Miller",
    position: "SF",
    stats: {
      games_played: 65,
      min: "28:45",
      pts: 16.8,
      reb: 4.2,
      ast: 2.4,
      fg_pct: 0.438,
      fg3_pct: 0.368
    }
  },
  {
    player_id: 56677117,
    player_name: "Miles Bridges",
    position: "SF",
    stats: {
      games_played: 55,
      min: "30:15",
      pts: 19.6,
      reb: 7.2,
      ast: 3.1,
      fg_pct: 0.462,
      fg3_pct: 0.358
    }
  },
  {
    player_id: 666786,
    player_name: "Terry Rozier",
    position: "SG",
    stats: {
      games_played: 62,
      min: "31:20",
      pts: 21.2,
      reb: 3.9,
      ast: 5.2,
      fg_pct: 0.445,
      fg3_pct: 0.362
    }
  },
  {
    player_id: 3547258,
    player_name: "Mark Williams",
    position: "C",
    stats: {
      games_played: 59,
      min: "26:40",
      pts: 12.8,
      reb: 9.4,
      ast: 1.2,
      fg_pct: 0.632,
      fg3_pct: 0.000
    }
  },
  {
    player_id: 3547238,
    player_name: "Nick Richards",
    position: "C",
    stats: {
      games_played: 68,
      min: "22:15",
      pts: 9.4,
      reb: 7.8,
      ast: 0.8,
      fg_pct: 0.668,
      fg3_pct: 0.000
    }
  },
  {
    player_id: 3547251,
    player_name: "Grant Williams",
    position: "PF",
    stats: {
      games_played: 63,
      min: "25:30",
      pts: 8.6,
      reb: 5.4,
      ast: 1.6,
      fg_pct: 0.445,
      fg3_pct: 0.372
    }
  },
  {
    player_id: 3547244,
    player_name: "P.J. Washington",
    position: "PF",
    stats: {
      games_played: 61,
      min: "28:45",
      pts: 13.8,
      reb: 5.2,
      ast: 2.2,
      fg_pct: 0.448,
      fg3_pct: 0.352
    }
  }
];

// Function to get mock stats for a player by ID
export function getMockStatsById(playerId: number): PlayerSeasonAverages | undefined {
  return mockPlayerStats.find(player => player.player_id === playerId);
}

// Function to generate realistic mock stats for a player not in our preset list
export function generateMockStats(playerId: number, name: string, position: string): PlayerSeasonAverages {
  // Base stats adjusted by position
  const baseStats = {
    'PG': { pts: 14, reb: 3, ast: 6, fg: 0.44, fg3: 0.36 },
    'SG': { pts: 15, reb: 3, ast: 3, fg: 0.45, fg3: 0.37 },
    'SF': { pts: 13, reb: 5, ast: 2, fg: 0.46, fg3: 0.35 },
    'PF': { pts: 12, reb: 6, ast: 2, fg: 0.48, fg3: 0.33 },
    'C':  { pts: 11, reb: 8, ast: 1, fg: 0.58, fg3: 0.00 }
  };

  // Get base stats for position, defaulting to SF if position not found
  const base = baseStats[position as keyof typeof baseStats] || baseStats['SF'];

  // Add some randomness to make each player unique
  const randomize = (value: number, variance: number) => 
    value + (Math.random() * variance * 2 - variance);

  return {
    player_id: playerId,
    player_name: name,
    position,
    stats: {
      games_played: Math.floor(randomize(62, 8)),
      min: `${Math.floor(randomize(24, 6))}:${Math.floor(randomize(30, 15))}`,
      pts: Number(randomize(base.pts, 4).toFixed(1)),
      reb: Number(randomize(base.reb, 2).toFixed(1)),
      ast: Number(randomize(base.ast, 1.5).toFixed(1)),
      fg_pct: Number(randomize(base.fg, 0.03).toFixed(3)),
      fg3_pct: Number(randomize(base.fg3, 0.03).toFixed(3))
    }
  };
} 