'use client';

import { useState } from 'react';
import { ProcessedPlayerStats } from '../types/player';

interface LeaderboardTableProps {
  players: ProcessedPlayerStats[];
}

type SortField = 'pointsPerGame' | 'rebounds' | 'assists' | 'fieldGoalPercentage' | 'threePointPercentage' | 'minutesPlayed';
type SortDirection = 'asc' | 'desc';

export default function LeaderboardTable({ players }: LeaderboardTableProps) {
  const [sortField, setSortField] = useState<SortField>('pointsPerGame');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  });

  const headers: { field: SortField; label: string }[] = [
    { field: 'pointsPerGame', label: 'PPG' },
    { field: 'rebounds', label: 'REB' },
    { field: 'assists', label: 'AST' },
    { field: 'fieldGoalPercentage', label: 'FG%' },
    { field: 'threePointPercentage', label: '3P%' },
    { field: 'minutesPlayed', label: 'MIN' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player
            </th>
            {headers.map(({ field, label }) => (
              <th
                key={field}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(field)}
              >
                <div className="flex items-center space-x-1">
                  <span>{label}</span>
                  {sortField === field && (
                    <span className="ml-1">
                      {sortDirection === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedPlayers.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {player.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {player.pointsPerGame.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {player.rebounds.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {player.assists.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(player.fieldGoalPercentage * 100).toFixed(1)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(player.threePointPercentage * 100).toFixed(1)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {player.minutesPlayed.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 