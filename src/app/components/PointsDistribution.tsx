import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PlayerStats } from '@/app/types/player';
import { colors, baseChartOptions } from '@/app/utils/chartTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PointsDistributionProps {
  data: PlayerStats[];
}

export default function PointsDistribution({ data }: PointsDistributionProps) {
  // Sort players by points per game
  const sortedData = [...data].sort((a, b) => b.pts - a.pts);

  const chartData = {
    labels: sortedData.map(player => player.player_name),
    datasets: [
      {
        label: 'Points Per Game',
        data: sortedData.map(player => player.pts.toFixed(1)),
        backgroundColor: colors.accent.light,
        borderColor: colors.accent.main,
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      legend: {
        ...baseChartOptions.plugins.legend,
        labels: {
          ...baseChartOptions.plugins.legend.labels,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        ...baseChartOptions.plugins.tooltip,
        callbacks: {
          label: function(context: any) {
            return `Points: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        ...baseChartOptions.scales.y,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Points Per Game',
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: { top: 10, bottom: 0 },
        },
      },
      x: {
        ...baseChartOptions.scales.x,
        ticks: {
          ...baseChartOptions.scales.x.ticks,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    barPercentage: 0.8,
    categoryPercentage: 0.9,
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Points Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] pt-4">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
} 