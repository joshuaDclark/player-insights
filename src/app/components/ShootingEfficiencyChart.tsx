'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PlayerStats } from '../types/player';

interface ShootingEfficiencyChartProps {
  players: PlayerStats[];
}

export default function ShootingEfficiencyChart({ players }: ShootingEfficiencyChartProps) {
  const data = players.map((player) => ({
    name: player.name,
    'Field Goal %': player.fieldGoalPercentage,
    '3-Point %': player.threePointPercentage,
  }));

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Shooting Efficiency</h3>
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
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Field Goal %" fill="#8884d8" />
          <Bar dataKey="3-Point %" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 