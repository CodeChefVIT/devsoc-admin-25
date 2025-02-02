import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { type Row } from "@tanstack/react-table"; // Adjust the import based on your setup
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Leaderboard } from "@/api/leaderboard";
import { setTeamRound } from "@/api/teams";

interface SelectCellProps {
  row: Row<Leaderboard>;
}

function ChangeRound({ row }: SelectCellProps) {
  const queryClient = useQueryClient();

  const [selectedValue, setSelectedValue] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (data: { id: string; round: string }) => {
      return setTeamRound(data.id, data.round);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["leaderboard", "teams"],
      });
    },
  });
  //So, even if mutation.mutate fails its gonna set to new value. Fix should be ez
  const handleValueChange = (round: string) => {
    mutation.mutate({ id: row.original.team_id, round: round });
    setSelectedValue(round); // Update local state immediately
  };

  return (
    <div className="w-full">
      <Select
        value={selectedValue} // Use value for controlled component
        disabled={mutation.isPending}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="m-2 rounded-md border bg-[#121212] p-2">
          <SelectValue placeholder={`Select Round`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="">
            <SelectLabel>{`Select Round`}</SelectLabel>
            {["1", "2", "3"].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ChangeRound;
