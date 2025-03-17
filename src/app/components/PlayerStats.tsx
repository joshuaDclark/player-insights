'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerStats } from "@/app/types/player";

interface PlayerStatsProps {
  player: PlayerStats;
}

export default function PlayerStatsDisplay({ player }: PlayerStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{player.player_name} Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-between">
            <span>Points</span>
            <span className="font-medium">{player.pts.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span>Rebounds</span>
            <span className="font-medium">{player.reb.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span>Assists</span>
            <span className="font-medium">{player.ast.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span>FG%</span>
            <span className="font-medium">{(player.fg_pct * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Minutes</span>
            <span className="font-medium">{player.min}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 