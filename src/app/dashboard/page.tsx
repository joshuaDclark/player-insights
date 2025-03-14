"use client";
import { useEffect, useState } from "react";
import PlayerStats from '../components/PlayerStats';
import LeaderboardTable from '../components/LeaderboardTable';
import ShootingEfficiencyChart from '../components/ShootingEfficiencyChart';
import PerformanceRadarChart from '../components/PerformanceRadarChart';
import PointsDistributionChart from '../components/PointsDistributionChart';
import { PlayerStats as PlayerStatsType } from '../types/player';

export default function DashboardPage() {
  const [players, setPlayers] = useState<PlayerStatsType[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStatsType | null>(null);

  useEffect(() => {
    fetch('/api/players/stats')
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.data);
        if (data.data.length > 0) {
          setSelectedPlayer(data.data[0]);
        }
      })
      .catch((error) => console.error('Error fetching stats:', error));
  }, []);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Player Statistics Dashboard</h1>
      
      {/* Player Cards */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Player Overview</h2>
        <PlayerStats />
      </div>

      {/* Leaderboard */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Statistical Leaders</h2>
        <LeaderboardTable players={players} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ShootingEfficiencyChart players={players} />
        {selectedPlayer && <PerformanceRadarChart player={selectedPlayer} />}
        <PointsDistributionChart players={players} />
      </div>

      {/* Player Selector */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Select Player for Radar Chart</h2>
        <select
          className="w-full max-w-xs p-2 border rounded-md"
          value={selectedPlayer?.id || ''}
          onChange={(e) => {
            const player = players.find(p => p.id === e.target.value);
            if (player) setSelectedPlayer(player);
          }}
        >
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}