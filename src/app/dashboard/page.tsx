"use client";
import { useEffect, useState } from "react";
import PlayerLeaderboard from '@/app/components/PlayerLeaderboard';
import ShootingEfficiency from '@/app/components/ShootingEfficiency';
import PerformanceRadar from '@/app/components/PerformanceRadar';
import PointsDistribution from '@/app/components/PointsDistribution';
import { DashboardData, PlayerStats } from '@/app/types/player';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hornets/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const dashboardData = await response.json();
        setData(dashboardData);
        if (dashboardData.allPlayers.length > 0) {
          setSelectedPlayer(dashboardData.allPlayers[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No data available</p>
      </div>
    );
  }

  const handlePlayerChange = (player: PlayerStats) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Charlotte Hornets Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Season {data.metadata.season} • Last updated: {new Date(data.metadata.last_updated).toLocaleString()}
      </p>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <PlayerLeaderboard leaderboards={data.leaderboards} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ShootingEfficiency data={data.shootingEfficiency} />
          <PerformanceRadar
            player={selectedPlayer}
            onPlayerChange={handlePlayerChange}
            allPlayers={data.allPlayers}
          />
        </div>
        <div>
          <PointsDistribution data={data.allPlayers} />
        </div>
      </div>
    </div>
  );
}