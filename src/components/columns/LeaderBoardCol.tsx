"use client";
import { leaderboardSchema } from "@/api/leaderboard";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
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