import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayerStats } from "@/app/types/player";
import { useState } from "react";

interface PlayerLeaderboardProps {
  data: PlayerStats[];
}

type StatCategory = {
  value: string;
  label: string;
  statKey: keyof PlayerStats;
  format: string;
};

const statCategories: StatCategory[] = [
  { value: "points", label: "Points Per Game", statKey: "pts", format: "PPG" },
  { value: "assists", label: "Assists Per Game", statKey: "ast", format: "APG" },
  { value: "rebounds", label: "Rebounds Per Game", statKey: "reb", format: "RPG" },
  { value: "fg", label: "Field Goal Percentage", statKey: "fg_pct", format: "FG%" },
  { value: "minutes", label: "Minutes Per Game", statKey: "min", format: "MPG" },
];

export default function PlayerLeaderboard({ data }: PlayerLeaderboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<StatCategory>(statCategories[0]);

  const getLeaders = (category: StatCategory) => {
    if (category.statKey === "min") {
      return [...data]
        .sort((a, b) => {
          const bVal = Number(b[category.statKey]);
          const aVal = Number(a[category.statKey]);
          return bVal - aVal;
        })
        .slice(0, 5);
    }
    return [...data]
      .sort((a, b) => {
        const bVal = Number(b[category.statKey]);
        const aVal = Number(a[category.statKey]);
        return bVal - aVal;
      })
      .slice(0, 5);
  };

  const formatValue = (value: number | string, type: keyof PlayerStats) => {
    if (type === 'fg_pct') return `${(value as number * 100).toFixed(1)}%`;
    if (type === 'min') return value as string;
    return (value as number).toFixed(1);
  };

  const leaders = getLeaders(selectedCategory);

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold">Top Performers</CardTitle>
        <div className="w-[280px]">
          <Select
            value={selectedCategory.value}
            onValueChange={(value) => {
              const category = statCategories.find(cat => cat.value === value);
              if (category) setSelectedCategory(category);
            }}
          >
            <SelectTrigger className="w-full bg-white cursor-pointer">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="border shadow-md bg-white cursor-pointer">
              {statCategories.map((category) => (
                <SelectItem 
                  key={category.value} 
                  value={category.value}
                  className="hover:bg-slate-200 cursor-pointer"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] text-center">#</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead className="text-right w-[120px]">{selectedCategory.format}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.map((player, index) => (
                <TableRow key={player.player_id} className="hover:bg-muted/50">
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{player.player_name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatValue(player[selectedCategory.statKey], selectedCategory.statKey)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
} 