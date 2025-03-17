import { PlayerStats } from "@/app/types/player";
import { RadarChartData } from "@/app/types/charts";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface PerformanceRadarProps {
  player: PlayerStats;
}

export default function PerformanceRadar({ player }: PerformanceRadarProps) {
  const data: RadarChartData[] = [
    {
      subject: "Points",
      value: player.pts,
      fullMark: 30,
    },
    {
      subject: "Rebounds",
      value: player.reb,
      fullMark: 15,
    },
    {
      subject: "Assists",
      value: player.ast,
      fullMark: 15,
    },
    {
      subject: "FG%",
      value: player.fg_pct * 100,
      fullMark: 100,
    },
    {
      subject: "3P%",
      value: player.fg3_pct * 100,
      fullMark: 100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name={player.player_name}
          dataKey="value"
          stroke="#2563eb"
          fill="#2563eb"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
} 