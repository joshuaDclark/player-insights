export interface PlayerStats {
  id: string;
  name: string;
  pointsPerGame: number;
  rebounds: number;
  assists: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  minutesPlayed: number;
}

export interface PlayerStatsResponse {
  data: PlayerStats[];
  error?: string;
}

export type PlayerStatsError = {
  message: string;
  code?: string;
} 