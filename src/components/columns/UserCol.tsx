"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { type User } from "@/data/schema"


const columns: ColumnDef<User>[] = [
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
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "team_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Team ID" />,
    cell: ({ row }) => <span>{row.getValue("team_id")}</span>,
  },
  {
    accessorKey: "is_vitian",
    header: ({ column }) => <DataTableColumnHeader column={column} title="VITian" />,
    cell: ({ row }) => (
        <Badge variant={row.getValue("is_vitian") ? "default" : "outline"}>
          {row.getValue("is_vitian") ? "Yes" : "No"}
        </Badge>
      ),
  },
  {
    accessorKey: "reg_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reg No." />,
    cell: ({ row }) => <span>{row.getValue("reg_no")}</span>,
  },
  {
    accessorKey: "phone_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone No." />,
    cell: ({ row }) => <span>{row.getValue("phone_no")}</span>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => <span>{row.getValue("role")}</span>,
  },
  {
    accessorKey: "is_leader",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Leader" />,
    cell: ({ row }) => (
      <Badge variant={row.getValue("is_leader") ? "default" : "outline"}>
        {row.getValue("is_leader") ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "college",
    header: ({ column }) => <DataTableColumnHeader column={column} title="College" />,
    cell: ({ row }) => <span>{row.getValue("college")}</span>,
  },
//   {
//     accessorKey: "is_verified",
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Verified" />,
//     cell: ({ row }) => (
//       <Badge variant={row.getValue("is_verified") ? "default" : "outline"}>
//         {row.getValue("is_verified") ? "Yes" : "No"}
//       </Badge>
//     ),
//   },
  {
    accessorKey: "is_banned",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Banned" />,
    cell: ({ row }) => (
      <Badge variant={row.getValue("is_banned") ? "destructive" : "outline"}>
        {row.getValue("is_banned") ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export default columns;
