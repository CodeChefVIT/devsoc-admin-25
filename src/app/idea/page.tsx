"use client";
import { fetchIdeas, type ideaType } from "@/api/fetchIdeas";
import loading from "@/assets/images/loading.gif";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ModalTeamIdea } from "./ModalTeamIdea";
import { useDebounce } from "use-debounce";
import CopyLabel from "@/components/CopyLabel";

export default function TeamsIdeasTable() {
  const queryClient = useQueryClient();
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined,
  );

  const [pageLimit, setPageLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [nameDebounce] = useDebounce(searchTerm, 1000);
  const tracks = [
    "Media and Entertainment",
    "Finance and Fintech",
    "Healthcare and Education",
    "Environment and Sustainability",
    "Digital Security",
    "Open Innovation",
  ];
  const {
    data: ideasData,
    isLoading: ideasLoading,
    isError: ideasError,
  } = useQuery({
    queryKey: ["idea", currentCursor, pageLimit, nameDebounce],
    queryFn: () =>
      fetchIdeas({
        limit: pageLimit,
        cursorId: currentCursor,
        name: nameDebounce
      }),
  });
  const handleNextPage = () => {
    if (ideasData?.nextCursor) {
      console.log("yes cursor available");
      setCursorHistory((prev) => [...prev, currentCursor ?? ""]); // Store current cursor
      setCurrentCursor(ideasData.nextCursor); // Move to the next page
    }
  };
  useEffect(() => {
    void queryClient.invalidateQueries({
      queryKey: ["idea"],
    });
  }, [selectedTrack]);

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
        <DataTableColumnHeader column={column} title="Team ID" />
      ),
      cell: ({ row }) => (
        // <span className="relative block max-w-[100px] cursor-pointer truncate text-ellipsis whitespace-nowrap text-white">
        //   {row.original.TeamID}
        // </span>
        <CopyLabel label={row.original.TeamID}/>
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
        <ModalTeamIdea row={row.original}>
          <Button>View</Button>
        </ModalTeamIdea>
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
        <div className="text-lg text-red-500">Error loading ideas</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search teams or submissions..."
          className="w-64 rounded-md border border-gray-300 p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <Select
          value={selectedTrack ?? ""}
          onValueChange={(value) => {
            setSearchTerm(value === "all" ? "" : String(Number(value)));
          }}
        >
          <SelectTrigger className="w-48 p-6">
            <SelectValue placeholder="Filter by track" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tracks</SelectItem>
            {tracks.map((track, index) => (
              <SelectItem key={track} value={String(index + 1)}>
                {track}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      {
        <DataTable
          columns={columns}
          data={ideasData?.idea.ideas ?? []}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          setPageLimit={setPageLimit}
          pageLimit={pageLimit}
        />
      }
    </>
  );
}