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
import { useEffect, useState } from "react";


export default function Users() {


  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(undefined);  

  // const queryClient = useQueryClient();

  const {
      data: userList,
      isLoading,
      isError,
  } = useQuery({
    queryKey: ["users", currentCursor],
      queryFn: () => fetchUsers({limit: 10, cursorId: currentCursor}),
      placeholderData: (previousData) => previousData,
  });



  const handleNextPage = () => {
    if (userList?.nextCursor) {
      console.log("yes cursor available")
      setCursorHistory((prev) => [...prev, currentCursor ?? ""]); // Store current cursor
      setCurrentCursor(userList.nextCursor); // Move to the next page
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      const prevCursor = cursorHistory[cursorHistory.length - 1]; // Get last cursor
      setCursorHistory((prev) => prev.slice(0, -1)); // Remove last cursor from history
      setCurrentCursor(prevCursor ?? undefined); // Move to previous page
    }
  };
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
          // data={oosers}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
      />
        
    </div>
  );
}
