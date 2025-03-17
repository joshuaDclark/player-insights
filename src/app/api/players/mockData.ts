import { ProcessedPlayerStats } from '@/app/types/player';

export const mockPlayerStats: ProcessedPlayerStats[] = [
  {
    id: 1,
    name: "LaMelo Ball",
    pointsPerGame: 23.3,
    rebounds: 6.4,
    assists: 8.4,
    fieldGoalPercentage: 44.2,
    threePointPercentage: 37.6,
    minutesPlayed: 35.2,
    gamesPlayed: 58,
    efficiency: 28.5,
    steals: 1.9,
    blocks: 0.3,
    turnovers: 3.6,
    comparisonToTeam: {
      pointsPerGame: 15.2,
      rebounds: 5.8,
      assists: 25.4,
      fieldGoalPercentage: 2.1,
      minutesPlayed: 12.5
    }
  },
  {
    id: 2,
    name: "Miles Bridges",
    pointsPerGame: 21.2,
    rebounds: 7.0,
    assists: 3.8,
    fieldGoalPercentage: 49.1,
    threePointPercentage: 33.1,
    minutesPlayed: 33.5,
    gamesPlayed: 62,
    efficiency: 24.8,
    steals: 1.1,
    blocks: 0.8,
    turnovers: 2.4,
    comparisonToTeam: {
      pointsPerGame: 8.4,
      rebounds: 12.3,
      assists: -5.2,
      fieldGoalPercentage: 4.8,
      minutesPlayed: 8.2
    }
  },
  {
    id: 3,
    name: "Terry Rozier",
    pointsPerGame: 21.1,
    rebounds: 4.1,
    assists: 5.2,
    fieldGoalPercentage: 44.4,
    threePointPercentage: 36.5,
    minutesPlayed: 34.8,
    gamesPlayed: 65,
    efficiency: 22.6,
    steals: 1.3,
    blocks: 0.3,
    turnovers: 2.1,
    comparisonToTeam: {
      pointsPerGame: 7.8,
      rebounds: -15.4,
      assists: 8.6,
      fieldGoalPercentage: 1.2,
      minutesPlayed: 10.8
    }
  }
]; 