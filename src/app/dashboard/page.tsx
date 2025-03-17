"use client";
import { useEffect, useState } from "react";
import PlayerLeaderboard from '@/app/components/PlayerLeaderboard';
import ShootingEfficiency from '@/app/components/ShootingEfficiency';
import PerformanceRadar from '@/app/components/PerformanceRadar';
import PointsDistribution from '@/app/components/PointsDistribution';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlayerStats } from '@/app/types/player';

export default function DashboardPage() {
  const [data, setData] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hornets/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        
        // Validate the response data
        if (!result || !Array.isArray(result.data) || result.data.length === 0) {
          throw new Error('Invalid or empty data received');
        }

        console.log('Total players in raw data:', result.data.length);
        console.log('Player names:', result.data.map((p: any) => p.player_name).join(', '));

        // Validate each player object has required fields
        const validatedData = result.data.filter((player: any) => {
          return (
            player &&
            typeof player.player_id === 'number' &&
            typeof player.player_name === 'string' &&
            typeof player.pts === 'number' &&
            typeof player.ast === 'number' &&
            typeof player.reb === 'number' &&
            typeof player.fg_pct === 'number' &&
            typeof player.fg3_pct === 'number' &&
            typeof player.min === 'string'
          );
        });

        // Filter to only include 2023-24 active roster players
        const activeRoster = [
          "LaMelo Ball",
          "Brandon Miller",
          "Miles Bridges",
          "Terry Rozier",
          "Mark Williams",
          "P.J. Washington",
          "Gordon Hayward",
          "Nick Richards",
          "Bryce McGowens",
          "Theo Maledon",
          "JT Thor",
          "Nathan Mensah",
          "Cody Martin",
          "Frank Ntilikina",
          "Davis Bertans",
          "Amari Bailey",
          "James Bouknight",
          "Aleksej Pokusevski",
          "Leaky Black",
          "Tre Scott",
          "Kobi Simmons",
          "Xavier Sneed",
          "Jordan Miller",
          "Marques Bolden",
          "Jaylen Sims",
          "Nick Smith Jr.",
          "Kai Jones",
          "Seth Curry"
        ];

        const rosterData = validatedData.filter((player: PlayerStats) => 
          activeRoster.includes(player.player_name)
        );

        if (rosterData.length === 0) {
          throw new Error('No valid player data found');
        }

        setData(rosterData);
        setSelectedPlayer(rosterData[0]); // Set first player as default
        setError(null);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        setData([]);
        setSelectedPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">
          {error || 'No player data available'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between pb-2 border-b">
        <h1 className="text-3xl font-bold tracking-tight">Charlotte Hornets Dashboard</h1>
      </div>

      <PlayerLeaderboard data={data} />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold">Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Stats</h3>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center py-1 border-b border-muted/40">
                    <span className="text-muted-foreground">Active Players</span>
                    <span className="font-medium tabular-nums">{data.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-muted/40">
                    <span className="text-muted-foreground">Avg Points</span>
                    <span className="font-medium tabular-nums">
                      {(data.reduce((acc, p) => acc + p.pts, 0) / data.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-muted/40">
                    <span className="text-muted-foreground">Avg FG%</span>
                    <span className="font-medium tabular-nums">
                      {(data.reduce((acc, p) => acc + p.fg_pct, 0) / data.length * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Top Performers</h3>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center py-1 border-b border-muted/40">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-medium tabular-nums">
                      {data.reduce((max, p) => Math.max(max, p.pts), 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-muted/40">
                    <span className="text-muted-foreground">Assists</span>
                    <span className="font-medium tabular-nums">
                      {data.reduce((max, p) => Math.max(max, p.ast), 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-muted/40">
                    <span className="text-muted-foreground">Rebounds</span>
                    <span className="font-medium tabular-nums">
                      {data.reduce((max, p) => Math.max(max, p.reb), 0).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold">Shooting Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <ShootingEfficiency data={data} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold">Points Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PointsDistribution data={data} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Player Performance</CardTitle>
              <div className="w-[200px]">
                <Select
                  value={selectedPlayer?.player_id.toString()}
                  onValueChange={(value) => {
                    const player = data.find(p => p.player_id.toString() === value);
                    if (player) setSelectedPlayer(player);
                  }}
                >
                  <SelectTrigger className="bg-white cursor-pointer">
                    <SelectValue placeholder="Select a player" />
                  </SelectTrigger>
                  <SelectContent className="border shadow-md bg-white cursor-pointer">
                    {data.map((player) => (
                      <SelectItem 
                        key={player.player_id} 
                        value={player.player_id.toString()}
                        className="hover:bg-slate-200 cursor-pointer"
                      >
                        {player.player_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedPlayer && <PerformanceRadar player={selectedPlayer} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}