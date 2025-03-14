'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PlayerStats } from '../types/player';

interface PerformanceRadarChartProps {
  player: PlayerStats;
}

export default function PerformanceRadarChart({ player }: PerformanceRadarChartProps) {
  const data = [
    { subject: 'Points', value: player.pointsPerGame, fullMark: 30 },
    { subject: 'Rebounds', value: player.rebounds, fullMark: 15 },
    { subject: 'Assists', value: player.assists, fullMark: 15 },
    { subject: 'FG%', value: player.fieldGoalPercentage, fullMark: 100 },
    { subject: '3P%', value: player.threePointPercentage, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{player.name}'s Performance Radar</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
          <Radar
            name={player.name}
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
} 