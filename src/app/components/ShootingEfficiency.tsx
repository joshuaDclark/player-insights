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
import { ShootingData } from '@/app/types/player';
import { colors, baseChartOptions } from '@/app/utils/chartTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ShootingEfficiencyProps {
  data: ShootingData[];
}

export default function ShootingEfficiency({ data }: ShootingEfficiencyProps) {
  // Sort players by field goal percentage
  const sortedData = [...data].sort((a, b) => b.fg_pct - a.fg_pct);

  const chartData = {
    labels: sortedData.map(player => player.player_name),
    datasets: [
      {
        label: 'Field Goal %',
        data: sortedData.map(player => (player.fg_pct * 100).toFixed(1)),
        backgroundColor: colors.primary.light,
        borderColor: colors.primary.main,
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: '3-Point %',
        data: sortedData.map(player => (player.fg3_pct * 100).toFixed(1)),
        backgroundColor: colors.secondary.light,
        borderColor: colors.secondary.main,
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
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        ...baseChartOptions.scales.y,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage',
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
        <CardTitle>Shooting Efficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] pt-4">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
} 