"use client";
import { DataTable } from "@/components/table/data-table";
import columns from "@/components/columns";
import teamCol from "@/components/columns/TeamCol";
// import { useEffect, useMemo, useState } from "react";
// import { user } from "@/store/interfaces";
import tooms from "@/components/dumTeams.json";
// import useToast from "@/lib/toast";
import { useQuery } from "@tanstack/react-query";
import { type Team } from "@/data/schema";
import { fetchTeams } from "@/api/fetchTeams";
import { useState } from "react";

export default function Teams() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
      data: teamList,
      isLoading,
      isError,
  } = useQuery({
      queryKey: ["teams", pageIndex, pageSize],
      queryFn: () => fetchTeams({ page: pageIndex + 1, limit: pageSize }),
  });

  if (isLoading) {
    <>loading...</>;
  }
  if (isError) {
    <>skill issue</>;
  }
  return (
    <>
      <div className="p-4">
        <div className="mb-4"></div>
        {/* <DataTableUsers users={oosers} columns={userCol} /> */}
        <DataTable<Team, string>
            columns={teamCol}
            data={teamList?.teams ?? []}
            pageCount = {100}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
            currentPage = {pageIndex}
            pageSize = {pageSize}
        />
      </div>
    </>
  );
}
