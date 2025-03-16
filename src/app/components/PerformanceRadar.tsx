import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { colors, baseChartOptions } from '@/app/utils/chartTheme';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PerformanceRadarProps {
  player: PlayerStats;
}

export default function PerformanceRadar({ player }: PerformanceRadarProps) {
  const chartData = {
    labels: ['Points', 'Assists', 'Rebounds', 'FG%', '3P%'],
    datasets: [
      {
        label: player.player_name,
        data: [
          player.pts,
          player.ast,
          player.reb,
          player.fg_pct * 100,
          player.fg3_pct * 100,
        ],
        backgroundColor: `${colors.primary.light}80`,
        borderColor: colors.primary.main,
        borderWidth: 2,
        pointBackgroundColor: colors.primary.main,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.primary.main,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    ...baseChartOptions,
    scales: {
      r: {
        angleLines: {
          color: colors.neutral.light,
        },
        grid: {
          color: colors.neutral.light,
        },
        pointLabels: {
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          color: colors.neutral.dark,
        },
        suggestedMin: 0,
        ticks: {
          stepSize: 20,
          font: {
            size: 10,
          },
          color: colors.neutral.main,
        },
      },
    },
    plugins: {
      ...baseChartOptions.plugins,
      legend: {
        ...baseChartOptions.plugins.legend,
        labels: {
          ...baseChartOptions.plugins.legend.labels,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      tooltip: {
        ...baseChartOptions.plugins.tooltip,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw.toFixed(1);
            const metric = context.label;
            return `${label}: ${value}${metric.includes('%') ? '%' : ''}`;
          }
        }
      }
    },
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Performance Radar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] pt-4">
          <Radar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
} 