'use client';

import { PlayerStats } from '../types/player';

interface LeaderboardTableProps {
  players: PlayerStats[];
}

type StatCategory = {
  key: keyof PlayerStats;
  label: string;
  format: (value: number) => string;
};

const categories: StatCategory[] = [
  { key: 'pointsPerGame', label: 'Points', format: (v) => v.toFixed(1) },
  { key: 'rebounds', label: 'Rebounds', format: (v) => v.toFixed(1) },
  { key: 'assists', label: 'Assists', format: (v) => v.toFixed(1) },
  { key: 'fieldGoalPercentage', label: 'FG%', format: (v) => `${v.toFixed(1)}%` },
  { key: 'threePointPercentage', label: '3P%', format: (v) => `${v.toFixed(1)}%` },
];

export default function LeaderboardTable({ players }: LeaderboardTableProps) {
  const getTopFive = (category: keyof PlayerStats) => {
    return [...players]
      .sort((a, b) => (b[category] as number) - (a[category] as number))
      .slice(0, 5);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {categories.map((category) => (
              <th
                key={category.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {category.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[0, 1, 2, 3, 4].map((index) => (
            <tr key={index} className="hover:bg-gray-50">
              {categories.map((category) => {
                const topPlayers = getTopFive(category.key);
                const player = topPlayers[index];
                return (
                  <td key={category.key} className="px-6 py-4 whitespace-nowrap">
                    {player && (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {player.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {category.format(player[category.key] as number)}
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 