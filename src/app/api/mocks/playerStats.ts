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

// Mock data with realistic statistics for 2023-24 Hornets players
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
      min: "33:15",
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
  },
  {
    player_id: 666969,
    player_name: "Gordon Hayward",
    position: "SF",
    stats: {
      games_played: 57,
      min: "29:30",
      pts: 14.6,
      reb: 4.8,
      ast: 4.6,
      fg_pct: 0.468,
      fg3_pct: 0.365
    }
  },
  {
    player_id: 3547245,
    player_name: "Bryce McGowens",
    position: "SG",
    stats: {
      games_played: 52,
      min: "18:45",
      pts: 8.2,
      reb: 2.4,
      ast: 1.8,
      fg_pct: 0.412,
      fg3_pct: 0.348
    }
  },
  {
    player_id: 3547246,
    player_name: "Theo Maledon",
    position: "PG",
    stats: {
      games_played: 48,
      min: "16:30",
      pts: 6.8,
      reb: 2.1,
      ast: 3.4,
      fg_pct: 0.398,
      fg3_pct: 0.342
    }
  },
  {
    player_id: 3547247,
    player_name: "JT Thor",
    position: "PF",
    stats: {
      games_played: 45,
      min: "14:20",
      pts: 5.4,
      reb: 3.2,
      ast: 0.8,
      fg_pct: 0.428,
      fg3_pct: 0.328
    }
  },
  {
    player_id: 3547248,
    player_name: "Nathan Mensah",
    position: "C",
    stats: {
      games_played: 32,
      min: "12:15",
      pts: 4.2,
      reb: 3.8,
      ast: 0.4,
      fg_pct: 0.582,
      fg3_pct: 0.000
    }
  },
  {
    player_id: 3547249,
    player_name: "Cody Martin",
    position: "SF",
    stats: {
      games_played: 44,
      min: "20:45",
      pts: 7.8,
      reb: 3.6,
      ast: 2.2,
      fg_pct: 0.432,
      fg3_pct: 0.338
    }
  },
  {
    player_id: 3547250,
    player_name: "Frank Ntilikina",
    position: "PG",
    stats: {
      games_played: 38,
      min: "15:30",
      pts: 5.6,
      reb: 1.8,
      ast: 2.8,
      fg_pct: 0.388,
      fg3_pct: 0.332
    }
  },
  {
    player_id: 3547251,
    player_name: "Davis Bertans",
    position: "PF",
    stats: {
      games_played: 42,
      min: "16:45",
      pts: 6.8,
      reb: 2.4,
      ast: 0.8,
      fg_pct: 0.422,
      fg3_pct: 0.382
    }
  },
  {
    player_id: 3547252,
    player_name: "Amari Bailey",
    position: "SG",
    stats: {
      games_played: 35,
      min: "14:20",
      pts: 5.2,
      reb: 1.6,
      ast: 1.4,
      fg_pct: 0.402,
      fg3_pct: 0.328
    }
  },
  {
    player_id: 3547253,
    player_name: "James Bouknight",
    position: "SG",
    stats: {
      games_played: 34,
      min: "15:45",
      pts: 6.4,
      reb: 2.2,
      ast: 1.6,
      fg_pct: 0.412,
      fg3_pct: 0.342
    }
  },
  {
    player_id: 3547254,
    player_name: "Aleksej Pokusevski",
    position: "PF",
    stats: {
      games_played: 28,
      min: "12:30",
      pts: 4.8,
      reb: 3.2,
      ast: 1.2,
      fg_pct: 0.408,
      fg3_pct: 0.312
    }
  },
  {
    player_id: 3547255,
    player_name: "Leaky Black",
    position: "SF",
    stats: {
      games_played: 25,
      min: "10:15",
      pts: 3.6,
      reb: 2.4,
      ast: 0.8,
      fg_pct: 0.392,
      fg3_pct: 0.318
    }
  },
  {
    player_id: 3547256,
    player_name: "Tre Scott",
    position: "PF",
    stats: {
      games_played: 22,
      min: "8:45",
      pts: 2.8,
      reb: 2.6,
      ast: 0.4,
      fg_pct: 0.428,
      fg3_pct: 0.282
    }
  },
  {
    player_id: 3547257,
    player_name: "Kobi Simmons",
    position: "PG",
    stats: {
      games_played: 18,
      min: "9:30",
      pts: 3.2,
      reb: 1.2,
      ast: 1.8,
      fg_pct: 0.382,
      fg3_pct: 0.308
    }
  },
  {
    player_id: 3547258,
    player_name: "Xavier Sneed",
    position: "SF",
    stats: {
      games_played: 15,
      min: "7:45",
      pts: 2.4,
      reb: 1.4,
      ast: 0.6,
      fg_pct: 0.378,
      fg3_pct: 0.298
    }
  },
  {
    player_id: 3547259,
    player_name: "Jordan Miller",
    position: "SF",
    stats: {
      games_played: 12,
      min: "6:30",
      pts: 2.2,
      reb: 1.2,
      ast: 0.4,
      fg_pct: 0.368,
      fg3_pct: 0.288
    }
  },
  {
    player_id: 3547260,
    player_name: "Marques Bolden",
    position: "C",
    stats: {
      games_played: 10,
      min: "5:45",
      pts: 1.8,
      reb: 1.6,
      ast: 0.2,
      fg_pct: 0.482,
      fg3_pct: 0.000
    }
  },
  {
    player_id: 3547261,
    player_name: "Jaylen Sims",
    position: "SG",
    stats: {
      games_played: 8,
      min: "5:15",
      pts: 1.6,
      reb: 0.8,
      ast: 0.4,
      fg_pct: 0.362,
      fg3_pct: 0.292
    }
  },
  {
    player_id: 3547262,
    player_name: "Nick Smith Jr.",
    position: "SG",
    stats: {
      games_played: 42,
      min: "15:30",
      pts: 7.2,
      reb: 1.8,
      ast: 1.6,
      fg_pct: 0.408,
      fg3_pct: 0.348
    }
  },
  {
    player_id: 3547263,
    player_name: "Kai Jones",
    position: "C",
    stats: {
      games_played: 46,
      min: "14:45",
      pts: 5.8,
      reb: 4.2,
      ast: 0.6,
      fg_pct: 0.542,
      fg3_pct: 0.000
    }
  },
  {
    player_id: 3547264,
    player_name: "Seth Curry",
    position: "SG",
    stats: {
      games_played: 52,
      min: "18:30",
      pts: 8.6,
      reb: 1.8,
      ast: 2.2,
      fg_pct: 0.442,
      fg3_pct: 0.398
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