"use client";
import userCol from "@/components/columns/UserCol";
import { DataTable } from "@/components/table/data-table";
// import { useEffect, useMemo, useState } from "react";
// import { user } from "@/store/interfaces";
// import useToast from "@/lib/toast";
import { downloadCSV } from "@/api/downloadCSV";
import { fetchUsers } from "@/api/user";
import loading from "@/assets/images/loading.gif";
import { Button } from "@/components/ui/button";
import { type User } from "@/data/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SelectGender from "@/components/select-gender";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Users() {
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const [gender, setGender] = useState<string>("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined,
  );
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [theName, setTheName] = useState<string>("");
  // const queryClient = useQueryClient();
  const [nameDebounce] = useDebounce(theName, 500);
  const {
    data: userList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", currentCursor, nameDebounce, pageLimit],
    queryFn: () =>
      fetchUsers({
        limit: pageLimit,
        cursorId: currentCursor,
        name: nameDebounce,
        gender: gender,
      }),
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
  useEffect(() => {
    void queryClient.invalidateQueries({
      queryKey: ["users"],
    });
  }, [gender]);
  const onClick = async () => {
    try {
      const blob = await downloadCSV({what : "usercsv"});

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv"; // Set the filename for the downloaded file
      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading CSV:", err);
      alert("Failed to download CSV. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <input
          className="bg-gray mr-2 w-[50%] rounded-md border p-2 text-white"
          placeholder="Search"
          value={theName}
          onChange={(e) => setTheName(e.target.value)}
          type="text"
        />
        <SelectGender gender={gender} setGender={setGender}></SelectGender>
        <Button className="ml-2" onClick={onClick}>
          Download CSV{" "}
        </Button>
      </div>

      {isError && <div className="text-red-500">Error fetching user data</div>}

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
      {!isLoading && (
        <div className="w-full overflow-hidden">
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
      )}
    </div>
  );
}
