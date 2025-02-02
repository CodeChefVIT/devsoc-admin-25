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
import { useState } from "react";
import { type Leaderboard } from "@/api/leaderboard";
import { setTeamRound } from "@/api/teams";



function ChangeRound({ id }: {id:string}) {
  const queryClient = useQueryClient();

  const [selectedValue, setSelectedValue] = useState<string>("");
  
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
    <div className="flex items-center justify-center">
      <Select
        value={selectedValue}
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
