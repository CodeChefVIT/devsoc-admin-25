"use client";
import { fetchIdeas, ideaType } from "@/api/fetchIdeas";
import { fetchTeams } from "@/api/teams";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Team } from "@/data/schema";
import { useQuery } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface TeamData {
  id: string;
  name: string | null;
  numberOfPeople: number;
  roundQualified: number;
  submission: ideaType | null;
}

export default function TeamsIdeasTable() {
  const [pageLimit, setPageLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TeamData[]>([]);
  const [availableTracks, setAvailableTracks] = useState<string[]>([]);

  const {
    data: teamsData,
    isLoading: teamsLoading,
    isError: teamsError,
  } = useQuery({
    queryKey: ["idea", currentPage, pageLimit],
    queryFn: () =>
      fetchTeams({
        limit: pageLimit,
        cursorId: undefined,
      }),
  });



  const columns: ColumnDef<TeamData, unknown>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Team Name" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("name") ?? "Unnamed Team"}
        </div>
      ),
    },
    {
      accessorKey: "numberOfPeople",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Team Size" />
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("numberOfPeople")}</div>
      ),
    },
    {
      id: "submissionTitle",
      accessorFn: (row) => row.submission?.Title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Submission Title" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.submission?.Title ?? "No submission"}
        </div>
      ),
    },
    {
      id: "submissionDescription",
      accessorFn: (row) => row.submission?.Description,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">
          {row.original.submission?.Description ?? "No description"}
        </div>
      ),
    },
    {
      id: "track",
      accessorFn: (row) => row.submission?.Track,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Track" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.submission?.Track ?? "Unassigned"}
        </div>
      ),
    },
  ];

  if (teamsLoading || submissionsLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-lg">Loading teams and submissions...</div>
      </div>
    );
  }

  if (teamsError) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-lg text-red-500">Error loading teams data</div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Teams & Submissions Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search teams or submissions..."
            className="w-64 rounded-md border border-gray-300 p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedTrack ?? "all"}
            onValueChange={(value) =>
              setSelectedTrack(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-48 p-6">
              <SelectValue placeholder="Filter by track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tracks</SelectItem>
              {availableTracks.map((track) => (
                <SelectItem key={track} value={track}>
                  {track}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          handleNextPage={() => setCurrentPage((prev) => prev + 1)}
          handlePrevPage={() => setCurrentPage((prev) => prev - 1)}
          setPageLimit={setPageLimit}
          pageLimit={pageLimit}
        />
      </CardContent>
    </Card>
  );
}
