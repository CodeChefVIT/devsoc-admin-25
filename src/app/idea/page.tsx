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
import loading from "@/assets/images/loading.gif";
import Image from "next/image";

import { type Team } from "@/data/schema";
import { useQuery } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function TeamsIdeasTable() {
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined,
  );

  const [pageLimit, setPageLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const tracks = [
    "Media and Entertainment",
    "Finance and Fintech",
    "Healthcare and Education",
    "Digital Security",
    "Environment and Sustainability",
    "Environment and Sustainability",
    "Open Innovation",
  ];
  const {
    data: ideasData,
    isLoading: ideasLoading,
    isError: ideasError,
  } = useQuery({
    queryKey: ["idea", currentPage, pageLimit],
    queryFn: () =>
      fetchIdeas({
        limit: pageLimit,
        cursorId: undefined,
      }),
  });
  const handleNextPage = () => {
    if (ideasData?.nextCursor) {
      console.log("yes cursor available");
      setCursorHistory((prev) => [...prev, currentCursor ?? ""]); // Store current cursor
      setCurrentCursor(ideasData.nextCursor); // Move to the next page
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      const prevCursor = cursorHistory[cursorHistory.length - 1]; // Get last cursor
      setCursorHistory((prev) => prev.slice(0, -1)); // Remove last cursor from history
      setCurrentCursor(prevCursor ?? undefined); // Move to previous page
    }
  };
  const columns: ColumnDef<ideaType, unknown>[] = [
    {
      accessorKey: "numberOfPeople",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Team Size" />
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.TeamID}</div>
      ),
    },
    {
      id: "submissionTitle",
      accessorFn: (row) => row.Title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Submission Title" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.Title ?? "No submission"}
        </div>
      ),
    },
    {
      id: "submissionDescription",
      accessorFn: (row) => row.Description,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">
          {row.original.Description ?? "No description"}
        </div>
      ),
    },
    {
      id: "track",
      accessorFn: (row) => row.Track,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Track" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.Track ?? "Unassigned"}
        </div>
      ),
    },
  ];

  if (ideasLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="flex justify-center">
          <Image
            className="w-[50%]"
            src={loading}
            width={100}
            height={100}
            alt="Loading..."
          />
        </div>{" "}
      </div>
    );
  }

  if (ideasError) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-lg text-red-500">Error loading teams data</div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ideas </CardTitle>
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
              {tracks.map((track, index) => (
                <SelectItem key={track} value={String(index)}>
                  {track}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {ideasData?.idea && (
          <DataTable
            columns={columns}
            data={ideasData?.idea}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            setPageLimit={setPageLimit}
            pageLimit={pageLimit}
          />
        )}
      </CardContent>
    </Card>
  );
}
