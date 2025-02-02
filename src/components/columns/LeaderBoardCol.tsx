"use client";
import { type leaderboardUserSchema } from "@/api/leaderboard";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type z } from "zod";
import ViewScores from "../ViewScores";
import ChangeRound from "../changeRound";
import { Button } from "../ui/button";

const columns: ColumnDef<z.infer<typeof leaderboardUserSchema>>[] = [
  {
    accessorKey: "team_name",
    header: "Team Name",
  },
  {
    accessorKey: "overall_total",
    header: "Final Score",
  },
  {
    accessorKey: "rounds",
    header: "Scores",
    cell: ({ row }) => <ViewScores row={row} />,
  },
  {
    accessorKey: "ID",
    header: "Change Round",
    cell: ({ row }) => <ChangeRound id={row.original.team_id} />,
  },
  {
    accessorKey: "View",
    header: "View Team",
    cell: ({ row }) => (
      <Link
        href={`/team/${row.original.team_id}`}
        className="hover:cursor-pointer"
      >
        <Button variant="outline">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];

export default columns;
