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
  // Sort players by points in descending order
  const sortedData = [...data].sort((a, b) => b.points - a.points);

  const chartData = {
    labels: sortedData.map(player => player.player_name),
    datasets: [
      {
        label: 'Points Per Game',
        data: sortedData.map(player => player.points),
        backgroundColor: sortedData.map(() => 'rgba(54, 162, 235, 0.5)'),
        borderColor: sortedData.map(() => 'rgba(54, 162, 235, 1)'),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Points: ${context.raw.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Points Per Game',
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
} 