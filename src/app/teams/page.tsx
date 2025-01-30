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

export default function Teams() {
  const {
    data: teamList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
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
        <DataTable<Team, string> columns={teamCol} data={tooms} />
      </div>
    </>
  );
}
