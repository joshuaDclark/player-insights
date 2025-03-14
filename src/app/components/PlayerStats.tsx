'use client';

import { useEffect, useState } from 'react';
import { PlayerStats as PlayerStatsType, PlayerStatsError } from '../types/player';
import { fetchPlayerStats } from '../utils/playerStats';
import LoadingStats from './LoadingStats';
import ErrorDisplay from './ErrorDisplay';

export default function PlayerStats() {
  const [stats, setStats] = useState<PlayerStatsType[] | null>(null);
  const [error, setError] = useState<PlayerStatsError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = async () => {
    setIsLoading(true);
    setError(null);
    const result = await fetchPlayerStats();
    setStats(result.data);
    setError(result.error);
    setIsLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (isLoading) return <LoadingStats />;
  if (error) return <ErrorDisplay error={error} onRetry={loadStats} />;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((player) => (
        <div
          key={player.id}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-4">{player.name}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Points per game</span>
              <span className="font-medium">{player.pointsPerGame.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rebounds</span>
              <span className="font-medium">{player.rebounds.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Assists</span>
              <span className="font-medium">{player.assists.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FG%</span>
              <span className="font-medium">{player.fieldGoalPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Minutes</span>
              <span className="font-medium">{player.minutesPlayed.toFixed(1)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 