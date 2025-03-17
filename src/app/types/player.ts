export interface PlayerStats {
  player_id: number;
  player_name: string;
  position: string;
  pts: number;
  reb: number;
  ast: number;
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

export interface APIResponse<T> {
  data: T;
  meta?: {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
  };
  metadata?: {
    season: number;
    timestamp: string;
    cached: boolean;
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface PlayerStatsResponse {
  data: PlayerStats[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
  };
}

export type PlayerStatsError = {
  message: string;
  code?: string;
} 