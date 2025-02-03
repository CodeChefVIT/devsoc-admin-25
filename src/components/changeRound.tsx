import { setTeamRound } from "@/api/teams";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function ChangeRound({ id, prefill = "" }: { id: string; prefill?: string }) {
  const queryClient = useQueryClient();

  const [selectedValue, setSelectedValue] = useState<string>(prefill);

  const mutation = useMutation({
    mutationFn: (data: { id: string; round: string }) => {
      return setTeamRound(data.id, Number(data.round));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["leaderboard", "teams"],
      });
    },
  });
  //So, even if mutation.mutate fails its gonna set to new value. Fix should be ez
  const handleValueChange = (round: string) => {
    mutation.mutate({ id: id, round: round });
    setSelectedValue(round); // Update local state immediately
  };

  return (
    <div className="flex items-center">
      <Select
        value={selectedValue}
        disabled={mutation.isPending}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="m-2 w-min rounded-md border bg-[#121212] p-2">
          <SelectValue placeholder={`Select Round`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="">
            <SelectLabel>{`Select Round`}</SelectLabel>
            {["0", "1", "2", "3"].map((option) => (
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
