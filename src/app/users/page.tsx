"use client";
import { DataTable } from "@/components/table/data-table";
import userCol from "@/components/columns/UserCol";
// import { useEffect, useMemo, useState } from "react";
// import { user } from "@/store/interfaces";
// import useToast from "@/lib/toast";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/fetchUsers";
import {type User } from "@/data/schema";
import {  useState } from "react";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import loading from "@/assets/images/loading.gif";
import { UserModal } from "@/components/table/user-modal";

export default function Users() {
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined,
  );
  const [pageLimit, setPageLimit] =useState<number>(10);
  const [theName, setTheName] = useState<string>("");
  // const queryClient = useQueryClient();
  const [nameDebounce] = useDebounce(theName, 1000);
  const {
    data: userList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", currentCursor, nameDebounce, pageLimit],
    queryFn: () =>
      fetchUsers({ limit: pageLimit, cursorId: currentCursor, name: nameDebounce }),
    placeholderData: (previousData) => previousData,
    // enabled: !!debouncedSearch,
  });

  const handleNextPage = () => {
    if (userList?.nextCursor) {
      console.log("yes cursor available");
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





  return (
    <div className="p-4">
      <div className="mb-4"></div>
      {/* <DataTableUsers users={oosers} columns={userCol} /> */}
      <div className="mb-4 flex flex-col items-start">
        <input
          className="bg-gray w-[50%] rounded-md border p-2 text-white"
          placeholder="Search"
          value={theName}
          onChange={(e) => setTheName(e.target.value)}
          type="text"
        />
      </div>
      
      {isError && <div className="text-red-500">Error fetching team data</div>}
      
      {isLoading && (
        <div className="flex justify-center">
          <Image
            className="w-[50%]"
            src={loading}
            width={100}
            height={100}
            alt="Loading..."
          />
        </div>
      )}

      
      <DataTable<User, string>
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        columns={userCol}
        data={userList?.users ?? []}
        // data={oosers}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
}
