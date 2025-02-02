"use client";
import { leaderboardSchema } from "@/api/leaderboard";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof leaderboardSchema>>[] = [
  {
    accessorKey: "team_id",
    header: "Year",
  },
  {
    accessorKey: "team_name",
    header: "Team Name",
  },
  {
    accessorKey: "scores",
    header: "Scores",
    cell: ({ row }) => <ViewScores row={row} />,
  },
];
