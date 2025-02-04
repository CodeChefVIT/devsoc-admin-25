"use client";
import { type leaderboardUserSchema } from "@/api/leaderboard";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type z } from "zod";
import ViewScores from "../ViewScores";
import ChangeRound from "../changeRound";
import { Button } from "../ui/button";
import { DataTableColumnHeader } from "../table/data-table-column-header";

const columns: ColumnDef<z.infer<typeof leaderboardUserSchema>>[] = [
  {
    accessorKey: "team_name",
    header: ({column})=>(
      <DataTableColumnHeader column={column} title="Team Name"/>
    )
  },
  {
    accessorKey: "overall_total",
    header: ({column})=>(
      <DataTableColumnHeader column={column} title="Final Score"/>
    )
  },
  {
    accessorKey: "rounds",
    header: ({column})=>(
      <DataTableColumnHeader column={column} title="Scores"/>
    ),
    cell: ({ row }) => <ViewScores row={row} />,
  },
  {
    accessorKey: "ID",
    header: ({column})=>(
      <DataTableColumnHeader column={column} title="Change Round"/>
    ),
    cell: ({ row }) => <ChangeRound id={row.original.team_id} prefill={String(row.original.rounds.length)} />,
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
