type CacheEntry<T> = {
  value: T;
  timestamp: number;
  cacheDuration: number;
};

class APICache {
  private static instance: APICache;
  private cache: Map<string, CacheEntry<any>>;
  private requestCounts: Map<string, number[]>;

  private constructor() {
    this.cache = new Map();
    this.requestCounts = new Map();
  }

  static getInstance(): APICache {
    if (!APICache.instance) {
      APICache.instance = new APICache();
    }
    return APICache.instance;
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.cacheDuration) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  set<T>(key: string, value: T, cacheDuration: number): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      cacheDuration
    });
  }

  async checkRateLimit(endpoint: string, maxRequests: number, timeWindow: number): Promise<boolean> {
    const now = Date.now();
    const requests = this.requestCounts.get(endpoint) || [];
    
    // Remove old requests outside the time window
    const validRequests = requests.filter(timestamp => now - timestamp < timeWindow);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requestCounts.set(endpoint, validRequests);
    return true;
  }

  clear(): void {
    this.cache.clear();
    this.requestCounts.clear();
  }
}

export const apiCache = APICache.getInstance();

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  backoffMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts) break;
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, backoffMs * Math.pow(2, attempt - 1))
      );
    }
  }
  
  throw lastError;
} 