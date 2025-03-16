import { NextResponse } from 'next/server';
import { BalldontlieService } from '@/app/services/balldontlieService';
import { apiCache } from '@/app/utils/apiUtils';
import { ProcessedPlayerStats } from '@/app/types/player';
import { mockPlayerStats } from '../mockData';
import { API_CONFIG } from '@/app/config/api';

const { CACHE_DURATION_MS } = API_CONFIG.BALLDONTLIE;
const balldontlieService = new BalldontlieService();
const USE_MOCK_DATA = process.env.NODE_ENV === 'development';

/**
 * GET handler for /api/players/processed
 * Returns processed player statistics for the current/last complete season
 */
export async function GET(request: Request) {
  try {
    // Season parameter is now optional
    const { searchParams } = new URL(request.url);
    const seasonParam = searchParams.get('season');
    const season = seasonParam ? parseInt(seasonParam) : undefined;

    // Get the complete season for cache key
    const completeSeason = season || await balldontlieService['getCompleteSeason']();
    const cacheKey = `processed_hornets_stats_${completeSeason}`;

    // Check if data is cached
    const cachedData = apiCache.get<ProcessedPlayerStats[]>(cacheKey);
    if (cachedData) {
      return NextResponse.json({
        data: cachedData,
        metadata: {
          timestamp: new Date().toISOString(),
          season: completeSeason,
          cached: true,
          cache_key: cacheKey,
          roster_size: cachedData.length,
          source: 'cache'
        }
      });
    }

    try {
      // Try to fetch from external API first
      const processedStats = await balldontlieService.getProcessedPlayerStats(season);
      
      return NextResponse.json({
        data: processedStats,
        metadata: {
          timestamp: new Date().toISOString(),
          season: completeSeason,
          cached: false,
          cache_key: cacheKey,
          roster_size: processedStats.length,
          source: 'api'
        }
      });
    } catch (apiError) {
      // If in development or API fails, use mock data
      if (USE_MOCK_DATA || (apiError instanceof Error && apiError.message.includes('HTTP error'))) {
        console.log('Using mock data as fallback');
        
        // Cache the mock data for a shorter duration
        apiCache.set(cacheKey, mockPlayerStats, CACHE_DURATION_MS / 2);
        
        return NextResponse.json({
          data: mockPlayerStats,
          metadata: {
            timestamp: new Date().toISOString(),
            season: completeSeason,
            cached: false,
            cache_key: cacheKey,
            roster_size: mockPlayerStats.length,
            source: 'mock'
          }
        });
      }
      
      // If not in development and not an HTTP error, rethrow
      throw apiError;
    }
  } catch (err) {
    console.error('Failed to fetch processed player stats:', err);
    
    let errorMessage = 'Failed to fetch processed player stats';
    let statusCode = 500;
    let errorCode = 'UNKNOWN_ERROR';

    if (err instanceof Error) {
      // API-specific errors
      if (err.message.includes('Rate limit exceeded')) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
        statusCode = 429;
        errorCode = 'RATE_LIMIT_EXCEEDED';
      } else if (err.message.includes('abort')) {
        errorMessage = 'Request timed out. Please try again.';
        statusCode = 408;
        errorCode = 'REQUEST_TIMEOUT';
      } else if (err.message.includes('No players found')) {
        errorMessage = 'No players found in roster';
        statusCode = 404;
        errorCode = 'NO_PLAYERS_FOUND';
      } else if (err.message.includes('No statistics available')) {
        errorMessage = 'No statistics available for the requested season';
        statusCode = 404;
        errorCode = 'NO_STATS_AVAILABLE';
      } else if (err.message.includes('Could not find Hornets team data')) {
        errorMessage = 'Could not find team data';
        statusCode = 404;
        errorCode = 'TEAM_NOT_FOUND';
      } else if (err.message.includes('HTTP error')) {
        errorMessage = 'External API request failed';
        statusCode = 502;
        errorCode = 'EXTERNAL_API_ERROR';
      }
    }

    return NextResponse.json(
      {
        error: {
          message: errorMessage,
          code: errorCode,
          details: err instanceof Error ? err.message : undefined
        },
        metadata: {
          timestamp: new Date().toISOString(),
          status: statusCode
        }
      },
      { status: statusCode }
    );
  }
} 