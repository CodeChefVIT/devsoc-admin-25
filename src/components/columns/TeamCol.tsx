"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { type Team } from "@/data/schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ChangeRound from "../changeRound";

const TeamActions = ({ teamId }: { teamId: string | null }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => router.push(`/team/${teamId}`)}
    >
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
};

const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "Name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Team Name" />,
    cell: ({ row }) => <span>{row.getValue("Name")}</span>,
  },
  {
    accessorKey: "NumberOfPeople",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number of People" />,
    cell: ({ row }) => <span>{row.getValue("NumberOfPeople")}</span>,
  },
  {
    accessorKey: "RoundQualified",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Round Qualified" />,
    cell: ({ row }) => <span>{row.getValue("RoundQualified")}</span>,
  },
  {
    accessorKey: "Code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Team Code" />,
    cell: ({ row }) => <span>{row.getValue("Code")}</span>,
  },
  {
    accessorKey: "IsBanned",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Banned" />,
    cell: ({ row }) => (
      <span>{row.getValue("IsBanned") ? "Yes" : "No"}</span>
    ),
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <TeamActions teamId={row.original.ID}/>
      );
    },
  },
  {
    accessorKey: "ID",
    header: "Change Round",
    cell: ({ row }) => <ChangeRound id={row.original.ID} />,
  },
];

export default columns;
