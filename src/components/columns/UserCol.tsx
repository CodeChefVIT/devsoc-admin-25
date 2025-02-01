"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { type User } from "@/data/schema";

const columns: ColumnDef<User>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "ID",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("ID")}</div>,
  // },
  {
    accessorKey: "FirstName",
  },
  {
    accessorKey: "LastName",
  },
  // {
  //   accessorKey: "Name",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  //   cell: ({ row }) => (
  //     <span>{`${row.getValue("FirstName")} ${row.getValue("LastName")}`}</span>
  //   ),
  // },
  {
    accessorKey: "Email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.getValue("Email")}</span>,
  },
  // {
  //   accessorKey: "TeamID",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Team ID" />,
  //   cell: ({ row }) => <span>{row.getValue("TeamID")}</span>,
  // },
  {
    accessorKey: "Gender",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => <span>{row.getValue("Gender")}</span>,
  },
  {
    accessorKey: "RegNo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reg No." />,
    cell: ({ row }) => <span>{row.getValue("RegNo")}</span>,
  },
  {
    accessorKey: "PhoneNo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone No." />,
    cell: ({ row }) => <span>{row.getValue("PhoneNo")}</span>,
  },
  // {
  //   accessorKey: "Role",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
  //   cell: ({ row }) => <span>{row.getValue("Role")}</span>,
  // },
  // {
  //   accessorKey: "IsLeader",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Leader" />,
  //   cell: ({ row }) => (
  //     <Badge variant={row.getValue("IsLeader") ? "default" : "outline"}>
  //       {row.getValue("IsLeader") ? "Yes" : "No"}
  //     </Badge>
  //   ),
  // // },
  // {
  //   accessorKey: "IsVerified",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Verified" />,
  //   cell: ({ row }) => (
  //     <Badge variant={row.getValue("IsVerified") ? "default" : "outline"}>
  //       {row.getValue("IsVerified") ? "Yes" : "No"}
  //     </Badge>
  //   ),
  // },
  {
    accessorKey: "IsBanned",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Banned" />,
    cell: ({ row }) => (
      <Badge variant={row.getValue("IsBanned") ? "destructive" : "outline"}>
        {row.getValue("IsBanned") ? "Yes" : "No"}
      </Badge>
    ),
  },
  // {
  //   accessorKey: "IsProfileComplete",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Profile Complete" />,
  //   cell: ({ row }) => (
  //     <Badge variant={row.getValue("IsProfileComplete") ? "default" : "outline"}>
  //       {row.getValue("IsProfileComplete") ? "Yes" : "No"}
  //     </Badge>
  //   ),
  // },
  // {
  //   accessorKey: "IsStarred",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Starred" />,
  //   cell: ({ row }) => (
  //     <Badge variant={row.getValue("IsStarred") ? "default" : "outline"}>
  //       {row.getValue("IsStarred") ? "Yes" : "No"}
  //     </Badge>
  //   ),
  // },
  // {
  //   accessorKey: "RoomNo",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Room No." />,
  //   cell: ({ row }) => <span>{row.getValue("RoomNo")}</span>,
  // },
  {
    accessorKey: "HostelBlock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hostel Block" />,
    cell: ({ row }) => <span>{row.getValue("HostelBlock")}</span>,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

export default columns;
