export const API_CONFIG = {
  BALLDONTLIE: {
    BASE_URL: 'https://api.balldontlie.io/v2',
    TIMEOUT_MS: 5000,
    CACHE_DURATION_MS: 5 * 60 * 1000, // 5 minutes
    PROCESSED_STATS_CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
    RATE_LIMIT: {
      MAX_REQUESTS: 60,
      TIME_WINDOW_MS: 60 * 1000, // 1 minute
    },
    RETRY: {
      MAX_ATTEMPTS: 3,
      BACKOFF_MS: 1000, // Initial backoff time
    }
  }
} as const; 