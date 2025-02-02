"use client";
import { type leaderboardUserSchema } from "@/api/leaderboard";
import { type ColumnDef } from "@tanstack/react-table";
import { type z } from "zod";
import ViewScores from "../ViewScores";
import ChangeRound from "../changeRound";

const columns: ColumnDef<z.infer<typeof leaderboardUserSchema>>[] = [
  {
    accessorKey: "team_name",
    header: "Team Name",
  },
  {
    accessorKey: "rounds",
    header: "Scores",
    cell: ({ row }) => <ViewScores row={row} />,
  },
  {
    accessorKey: "overall_total",
    header: "Final Score",
  },

  {
    accessorKey: "ID",
    header: "Set Round",
    cell: ({ row }) => <ChangeRound row={row} />,
  },
];

export default columns;
