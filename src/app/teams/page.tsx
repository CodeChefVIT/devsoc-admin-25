"use client";
import { DataTable } from "@/components/table/data-table";
import teamCol from "@/components/columns/TeamCol";
// import { useEffect, useMemo, useState } from "react";
// import { user } from "@/store/interfaces";
// import useToast from "@/lib/toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type Team } from "@/data/schema";
import { fetchTeams } from "@/api/fetchTeams";
import { useState } from "react";
// import { TeamModal } from "@/components/table/team-modal";
import { useDebounce } from "use-debounce";

export default function Teams() {
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined,
  );
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [theName, setTheName] = useState<string>("");
  // const queryClient = useQueryClient();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [nameDebounce] = useDebounce(theName, 1000);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: teamList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams", currentCursor, nameDebounce],
    queryFn: () =>
      fetchTeams({
        limit: pageLimit,
        cursorId: currentCursor,
        name: nameDebounce,
      }),
    // placeholderData: (previousData) => previousData,
  });

  const handleNextPage = () => {
    if (teamList?.nextCursor) {
      console.log("yes cursor available");
      setCursorHistory((prev) => [...prev, currentCursor ?? ""]); // Store current cursor
      setCurrentCursor(teamList.nextCursor); // Move to the next page
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      const prevCursor = cursorHistory[cursorHistory.length - 1]; // Get last cursor
      setCursorHistory((prev) => prev.slice(0, -1)); // Remove last cursor from history
      setCurrentCursor(prevCursor ?? undefined); // Move to previous page
    }
  };

  // const handlePageSizeChange = (size: number)=>{
  //   setPageSize(size);
  //   queryClient.invalidateQueries({queryKey: ["teams"]});
  // }

  const handleRowClick = (team: Team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  return (
    <>
      <div className="p-4">
        <div className="mb-4"></div>
        <div className="mb-4 flex flex-col items-start">
          <input
            className="bg-gray w-[50%] rounded-md border p-2 text-white"
            placeholder="Search"
            value={theName}
            onChange={(e) => setTheName(e.target.value)}
            type="text"
          />
        </div>
        {/* <DataTableUsers users={oosers} columns={userCol} /> */}

        <DataTable<Team, string>
          setPageLimit={setPageLimit}
          pageLimit={pageLimit}
          columns={teamCol}
          data={teamList?.teams ?? []}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
