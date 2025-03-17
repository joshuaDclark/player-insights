import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerStats } from "@/app/types/player";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeasonStatsProps {
  data: PlayerStats[];
}

type SortKey = 'pts' | 'reb' | 'ast' | 'fg_pct' | 'min';
type SortDirection = 'asc' | 'desc';

export default function SeasonStats({ data }: SeasonStatsProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'pts',
    direction: 'desc'
  });

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === 'min') {
      // Convert minutes string to number for comparison
      const aMin = Number(a[sortConfig.key].split(':')[0]);
      const bMin = Number(b[sortConfig.key].split(':')[0]);
      return sortConfig.direction === 'asc' ? aMin - bMin : bMin - aMin;
    }
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (key: SortKey) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'desc'
          ? 'asc'
          : 'desc',
    });
  };

  const formatValue = (value: number | string, key: SortKey) => {
    if (key === 'fg_pct') return `${(value as number * 100).toFixed(1)}%`;
    if (key === 'min') return value as string;
    return (value as number).toFixed(1);
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Season Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <div className="max-h-[500px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Player</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('pts')}
                      className="h-8 px-2 hover:bg-transparent"
                    >
                      Points
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('reb')}
                      className="h-8 px-2 hover:bg-transparent"
                    >
                      Rebounds
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('ast')}
                      className="h-8 px-2 hover:bg-transparent"
                    >
                      Assists
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('fg_pct')}
                      className="h-8 px-2 hover:bg-transparent"
                    >
                      FG%
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('min')}
                      className="h-8 px-2 hover:bg-transparent"
                    >
                      Minutes
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((player) => (
                  <TableRow key={player.player_id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {player.player_name}
                    </TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell className="tabular-nums">
                      {formatValue(player.pts, 'pts')}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatValue(player.reb, 'reb')}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatValue(player.ast, 'ast')}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatValue(player.fg_pct, 'fg_pct')}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatValue(player.min, 'min')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 