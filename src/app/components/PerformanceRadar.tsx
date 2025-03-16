import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { PlayerStats } from '@/app/types/player';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PerformanceRadarProps {
  player: PlayerStats | null;
  onPlayerChange: (player: PlayerStats) => void;
  allPlayers: PlayerStats[];
}

export default function PerformanceRadar({ player, onPlayerChange, allPlayers }: PerformanceRadarProps) {
  if (!player) return null;

  const chartData = {
    labels: ['Points', 'Rebounds', 'Assists', 'FG%', 'Minutes'],
    datasets: [
      {
        label: player.player_name,
        data: [
          player.points,
          player.rebounds,
          player.assists,
          player.fg_pct * 100,
          parseFloat(player.minutes),
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(
          ...allPlayers.map(p => p.points),
          ...allPlayers.map(p => p.rebounds),
          ...allPlayers.map(p => p.assists),
          ...allPlayers.map(p => p.fg_pct * 100),
          ...allPlayers.map(p => parseFloat(p.minutes))
        ),
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw;
            const metric = context.label;
            return `${label}: ${metric === 'FG%' ? value.toFixed(1) + '%' : value.toFixed(1)}`;
          }
        }
      }
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Radar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Select
            value={player.player_id.toString()}
            onValueChange={(value) => {
              const selectedPlayer = allPlayers.find(p => p.player_id.toString() === value);
              if (selectedPlayer) {
                onPlayerChange(selectedPlayer);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a player" />
            </SelectTrigger>
            <SelectContent>
              {allPlayers.map((p) => (
                <SelectItem key={p.player_id} value={p.player_id.toString()}>
                  {p.player_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="h-[300px]">
          <Radar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
} 