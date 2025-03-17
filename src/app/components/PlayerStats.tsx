'use client';

import { useEffect, useState } from 'react';
import { PlayerStats as PlayerStatsType, PlayerStatsError, ProcessedPlayerStats } from '../types/player';
import { fetchPlayerStats } from '../utils/playerStats';
import LoadingStats from './LoadingStats';
import ErrorDisplay from './ErrorDisplay';

interface PlayerStatsProps {
  player?: ProcessedPlayerStats;
  isLoading?: boolean;
}

export default function PlayerStats({ player, isLoading = false }: PlayerStatsProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="text-gray-500 text-center py-8">
        No player statistics available
      </div>
    );
  }

  const stats = [
    {
      label: "Points Per Game",
      value: player.pointsPerGame.toFixed(1),
      change: "+2.3",
      trend: "up"
    },
    {
      label: "Rebounds",
      value: player.rebounds.toFixed(1),
      change: "+0.8",
      trend: "up"
    },
    {
      label: "Assists",
      value: player.assists.toFixed(1),
      change: "-0.5",
      trend: "down"
    },
    {
      label: "FG%",
      value: (player.fieldGoalPercentage * 100).toFixed(1) + "%",
      change: "+1.2",
      trend: "up"
    },
    {
      label: "3P%",
      value: (player.threePointPercentage * 100).toFixed(1) + "%",
      change: "-2.1",
      trend: "down"
    },
    {
      label: "Minutes",
      value: player.minutesPlayed.toFixed(1),
      change: "+3.2",
      trend: "up"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{player.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="mt-2 flex items-end justify-between">
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 