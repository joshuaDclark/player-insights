'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PlayerStats } from '../types/player';

interface PointsDistributionChartProps {
  players: PlayerStats[];
}

export default function PointsDistributionChart({ players }: PointsDistributionChartProps) {
  const data = players
    .map((player) => ({
      name: player.name,
      points: player.pointsPerGame,
    }))
    .sort((a, b) => b.points - a.points);

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Points Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="points" fill="#8884d8" name="Points per Game" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 