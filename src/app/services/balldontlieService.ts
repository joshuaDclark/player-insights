import { BalldontlieAPI } from "@balldontlie/sdk";
import { PlayerStats, ProcessedPlayerStats } from '../types/player';
import { apiCache } from '../utils/apiUtils';
import { API_CONFIG } from '../config/api';

const { CACHE_DURATION_MS, PROCESSED_STATS_CACHE_DURATION } = API_CONFIG.BALLDONTLIE;
const API_KEY = process.env.BALLDONTLIE_API_KEY;

if (!API_KEY) {
  throw new Error('BALLDONTLIE_API_KEY environment variable is not set');
}

const api = new BalldontlieAPI({ apiKey: API_KEY });

export class BalldontlieService {
  private calculateEfficiency(stats: any): number {
    return (
      (stats.pts + stats.reb + stats.ast + stats.stl + stats.blk) -
      ((1 - stats.fg_pct) * 100 + stats.turnover)
    ) / (stats.games_played || 1);
  }

  private processPlayerStats(stats: PlayerStats[]): ProcessedPlayerStats[] {
    // Calculate team averages
    const teamAverages = {
      pointsPerGame: stats.reduce((sum, player) => sum + player.pointsPerGame, 0) / stats.length,
      rebounds: stats.reduce((sum, player) => sum + player.rebounds, 0) / stats.length,
      assists: stats.reduce((sum, player) => sum + player.assists, 0) / stats.length,
      fieldGoalPercentage: stats.reduce((sum, player) => sum + player.fieldGoalPercentage, 0) / stats.length,
      minutesPlayed: stats.reduce((sum, player) => sum + player.minutesPlayed, 0) / stats.length,
    };

    return stats.map(player => ({
      ...player,
      comparisonToTeam: {
        pointsPerGame: ((player.pointsPerGame - teamAverages.pointsPerGame) / teamAverages.pointsPerGame) * 100,
        rebounds: ((player.rebounds - teamAverages.rebounds) / teamAverages.rebounds) * 100,
        assists: ((player.assists - teamAverages.assists) / teamAverages.assists) * 100,
        fieldGoalPercentage: player.fieldGoalPercentage - teamAverages.fieldGoalPercentage,
        minutesPlayed: ((player.minutesPlayed - teamAverages.minutesPlayed) / teamAverages.minutesPlayed) * 100,
      }
    }));
  }

  private async getCurrentSeason(): Promise<number> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based
    
    // If we're before October, return the previous year as the season
    return currentMonth < 10 ? currentYear - 1 : currentYear;
  }

  private async getCompleteSeason(): Promise<number> {
    const currentSeason = await this.getCurrentSeason();
    const cacheKey = 'complete_season';
    const cachedSeason = apiCache.get<number>(cacheKey);
    
    if (cachedSeason !== null) {
      return cachedSeason;
    }

    try {
      // Try current season first
      const stats = await api.nba.getSeasonAverages({ season: currentSeason, player_id: 1 }); // Using a known player ID just to test
      
      // If we have data for current season, use it
      if (stats.data && stats.data.length > 0) {
        apiCache.set(cacheKey, currentSeason, CACHE_DURATION_MS);
        return currentSeason;
      }

      // If current season doesn't have data, use previous season
      const previousSeason = currentSeason - 1;
      apiCache.set(cacheKey, previousSeason, CACHE_DURATION_MS);
      return previousSeason;
    } catch (error) {
      console.error('Error determining complete season:', error);
      // Default to previous season if there's an error
      return currentSeason - 1;
    }
  }

  async getPlayerStats(season?: number): Promise<PlayerStats[]> {
    // If no season provided, get the most complete season
    if (!season) {
      season = await this.getCompleteSeason();
    }

    const cacheKey = `hornets_player_stats_${season}`;
    const cachedData = apiCache.get<PlayerStats[]>(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      // First get the Hornets team
      const teams = await api.nba.getTeams();
      const hornets = teams.data.find(team => team.name === 'Hornets');
      
      if (!hornets) {
        throw new Error('Could not find Hornets team data');
      }

      // Get all players for the Hornets
      const players = await api.nba.getPlayers({ team_ids: [hornets.id], per_page: 100 });
      
      if (!players.data || players.data.length === 0) {
        throw new Error('No players found in roster');
      }

      // Get stats for each player individually (SDK limitation)
      const statsPromises = players.data.map(player => 
        api.nba.getSeasonAverages({ season, player_id: player.id })
      );
      
      const statsResponses = await Promise.all(statsPromises);
      const allStats = statsResponses.flatMap(response => response.data);

      if (!allStats || allStats.length === 0) {
        throw new Error(`No statistics available for season ${season}`);
      }

      const playerStats: PlayerStats[] = allStats
        .filter(stat => stat.min !== '0:00' && stat.games_played > 0)
        .map(stat => {
          const player = players.data.find(p => p.id === stat.player_id);
          const efficiency = this.calculateEfficiency(stat);
          
          return {
            id: stat.player_id,
            name: player ? `${player.first_name} ${player.last_name}` : `Player ${stat.player_id}`,
            pointsPerGame: stat.pts || 0,
            rebounds: stat.reb || 0,
            assists: stat.ast || 0,
            fieldGoalPercentage: (stat.fg_pct || 0) * 100,
            threePointPercentage: (stat.fg3_pct || 0) * 100,
            minutesPlayed: parseFloat(stat.min) || 0,
            gamesPlayed: stat.games_played,
            efficiency: efficiency,
            steals: stat.stl || 0,
            blocks: stat.blk || 0,
            turnovers: stat.turnover || 0
          };
        })
        .sort((a, b) => b.efficiency - a.efficiency);

      if (playerStats.length === 0) {
        throw new Error('No valid player statistics found after filtering');
      }

      apiCache.set(cacheKey, playerStats, CACHE_DURATION_MS);
      return playerStats;
    } catch (error) {
      console.error('Error fetching Hornets player stats:', error);
      throw error;
    }
  }

  async getProcessedPlayerStats(season?: number): Promise<ProcessedPlayerStats[]> {
    const cacheKey = `processed_hornets_stats_${season || await this.getCompleteSeason()}`;
    const cachedData = apiCache.get<ProcessedPlayerStats[]>(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      // Get raw player stats first
      const rawStats = await this.getPlayerStats(season);
      
      // Process the stats with team comparisons
      const processedStats = this.processPlayerStats(rawStats);
      
      // Cache the processed stats for longer duration
      apiCache.set(cacheKey, processedStats, PROCESSED_STATS_CACHE_DURATION);
      
      return processedStats;
    } catch (error) {
      console.error('Error processing player stats:', error);
      throw error;
    }
  }
} 