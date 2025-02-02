"use client";
import { type leaderboardSchema } from "@/api/leaderboard";
import { type ColumnDef } from "@tanstack/react-table";
import { type z } from "zod";
import ViewScores from "../ViewScores";
import ChangeRound from "../changeRound";

 const columns: ColumnDef<z.infer<typeof leaderboardSchema>>[] = [
  {
    accessorKey: "team_name",
    header: "Team Name",
  },
  {
    accessorKey: "total_score",
    header: "Scores",
    cell: ({ row }) => <ViewScores row={row} />,
  },
  {
    accessorKey: "total_score",
    header: "Final Score",
  }
  ,
  {
    accessorKey: "ID",
    header: "Set Round",
    cell: ({ row }) => <ChangeRound row={row} />,

  }
];

export default columns