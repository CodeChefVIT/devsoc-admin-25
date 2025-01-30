"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { type Team } from "@/data/schema"; 

const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ID",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Team ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("ID")}</div>,
  },
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export default columns;
