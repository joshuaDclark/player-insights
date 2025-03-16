import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerStats } from '@/app/types/player';

interface LeaderboardProps {
  leaderboards: {
    points: PlayerStats[];
    rebounds: PlayerStats[];
    assists: PlayerStats[];
    fg_pct: PlayerStats[];
    minutes: PlayerStats[];
  };
}

export default function PlayerLeaderboard({ leaderboards }: LeaderboardProps) {
  const formatValue = (value: number | string, category: string) => {
    if (category === 'fg_pct') {
      return `${(Number(value) * 100).toFixed(1)}%`;
    }
    if (category === 'minutes') {
      return value.toString();
    }
    return Number(value).toFixed(1);
  };

  const renderLeaderboardTable = (players: PlayerStats[], category: string) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, index) => (
          <TableRow key={player.player_id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{player.player_name}</TableCell>
            <TableCell className="text-right">
              {formatValue(player[category as keyof PlayerStats], category)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Leaderboards</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="points" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="points">Points</TabsTrigger>
            <TabsTrigger value="rebounds">Rebounds</TabsTrigger>
            <TabsTrigger value="assists">Assists</TabsTrigger>
            <TabsTrigger value="fg_pct">FG%</TabsTrigger>
            <TabsTrigger value="minutes">Minutes</TabsTrigger>
          </TabsList>
          <TabsContent value="points">
            {renderLeaderboardTable(leaderboards.points, 'points')}
          </TabsContent>
          <TabsContent value="rebounds">
            {renderLeaderboardTable(leaderboards.rebounds, 'rebounds')}
          </TabsContent>
          <TabsContent value="assists">
            {renderLeaderboardTable(leaderboards.assists, 'assists')}
          </TabsContent>
          <TabsContent value="fg_pct">
            {renderLeaderboardTable(leaderboards.fg_pct, 'fg_pct')}
          </TabsContent>
          <TabsContent value="minutes">
            {renderLeaderboardTable(leaderboards.minutes, 'minutes')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 