"use client";
import { DataTable } from "@/components/table/data-table";
import columns from "@/components/columns";
import teamCol from "@/components/columns/TeamCol";
// import { useEffect, useMemo, useState } from "react";
// import { user } from "@/store/interfaces";
import tooms from "@/components/dumTeams.json";
// import useToast from "@/lib/toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type Team } from "@/data/schema";
import { fetchTeams } from "@/api/fetchTeams";
import { useState } from "react";
import { TeamModal } from "@/components/table/team-modal";

export default function Teams() {
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(undefined);  
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
      data: teamList,
      isLoading,
      isError,
  } = useQuery({
    queryKey: ["users", currentCursor],
      queryFn: () => fetchTeams({limit: 1, cursorId: currentCursor}),
      // placeholderData: (previousData) => previousData,
  });

  const handleNextPage = () => {
    if (teamList?.nextCursor) {
      console.log("yes cursor available")
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

  if (isLoading) {
    <>loading...</>;
  }
  if (isError) {
    <>skill issue</>;
  }
  const handleRowClick = (team: Team) => {
    setSelectedTeam(team);
    setOpen(true);
  };


  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="p-4">
        <div className="mb-4"></div>
        {/* <DataTableUsers users={oosers} columns={userCol} /> */}
        {selectedTeam && <TeamModal open = {open} onClose = {handleModalClose} team = {selectedTeam}/>}
        <DataTable<Team, string>
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
