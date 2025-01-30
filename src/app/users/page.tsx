"use client";
import { DataTable } from "@/components/table/data-table";
import columns from "@/components/columns";
import userCol from "@/components/columns/UserCol";
// import { useEffect, useMemo, useState } from "react";
// import { user } from "@/store/interfaces";
import oosers from "@/components/dumUser.json";
// import useToast from "@/lib/toast";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/fetchUsers";
import { User } from "@/data/schema"
import { useState } from "react";


export default function Users() {
  //     const { create } = useToast();
  //     const [userList, setUserList] = useState<{data: user[]} | null>(null);
  //     const [isError, setIsError] = useState<boolean>(false);
  //     const [isLoading, setIsLoading] = useState(true)

  //     useEffect(()=>{
  //         try{
  //             const transformedUsers = oosers.map(user =>({
  //               ...user,
  //               is_vitian: user.is_vitian ? 'true' : 'false',
  //               team_id: user.team_id === null ? null : user.team_id,
  //               }));
  //             setUserList({data: transformedUsers as user[]});
  //              setIsLoading(false)
  //         }
  //         catch(e){
  //             setIsError(true);
  //             setIsLoading(false)
  //         }
  //     },[]);

  //   useEffect(() => {
  //     if (isError) {
  //       create("Failed to fetch users", "error");
  //     }
  //   }, [isError, create]);

  //   const transformedTasks = useMemo(() => {
  //     if (!userList?.data) return [];
  //     return userList.data.map((user: user, index: number) => ({
  //       id: String(index + 1),
  //       title: user.name,
  //       label: user.role,
  //       status: user.is_verified ? "complete" : "incomplete",
  //       priority: user.is_banned ? "high" : "low",
  //     }));
  //   }, [userList?.data]);

  //   if (isLoading) {
  //     return <>Loading...</>;
  //   }

  //   if (!userList?.data && !isError) {
  //     return <div>No data</div>;
  //   }

  //   if(isError){
  //       return <>Skill Issue</>
  //   }

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: userList, isLoading, isError } = useQuery({
    queryKey: ["users", pageIndex, pageSize],
    queryFn: () => fetchUsers({ page: pageIndex + 1, limit: pageSize }),
  });

  if (isLoading) {
    <>loading...</>;
  }
  if (isError) {
    <>skill issue</>;
  }

  return (
    <div className="p-4">
      <div className="mb-4"></div>
      {/* <DataTableUsers users={oosers} columns={userCol} /> */}
      <DataTable<User, string>
          columns={userCol}
          data={userList?.users ?? []}
          pageCount = {100}
          onPageChange={setPageIndex}
          onPageSizeChange={setPageSize}
          currentPage = {pageIndex}
          pageSize = {pageSize}
      />
        
    </div>
  );
}
