export interface PlayerStats {
  player_id: number;
  player_name: string;
  position: string;
  pts: number;
  ast: number;
  reb: number;
  fg_pct: number;
  fg3_pct: number;
  min: string;
}

export interface ShootingData {
  player_id: number;
  player_name: string;
  fg_pct: number;
  fg3_pct: number;
}

export interface DashboardData {
  leaderboards: {
    points: PlayerStats[];
    rebounds: PlayerStats[];
    assists: PlayerStats[];
    fg_pct: PlayerStats[];
    minutes: PlayerStats[];
  };
  shootingEfficiency: ShootingData[];
  allPlayers: PlayerStats[];
  metadata: {
    season: number;
    last_updated: string;
    cached: boolean;
  };
}

export interface ProcessedPlayerStats extends PlayerStats {
  comparisonToTeam: {
    pointsPerGame: number;
    rebounds: number;
    assists: number;
    fieldGoalPercentage: number;
    minutesPlayed: number;
  };
}

export interface PlayerStatsResponse {
  data: PlayerStats[];
  error?: string;
}

export type PlayerStatsError = {
  message: string;
  code?: string;
} 