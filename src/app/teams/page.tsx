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
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
      data: teamList,
      isLoading,
      isError,
  } = useQuery({
      queryKey: ["teams", pageIndex, pageSize],
      queryFn: () => fetchTeams({ page: pageIndex + 1, limit: pageSize }),
  });

  const handlePageChange = (page: number)=>{
    setPageIndex(page);
    queryClient.invalidateQueries({queryKey: ["teams"]});
  }

  const handlePageSizeChange = (size: number)=>{
    setPageSize(size);
    queryClient.invalidateQueries({queryKey: ["teams"]});
  }

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
            pageCount = {100}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
            currentPage = {pageIndex}
            pageSize = {pageSize}
            onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
