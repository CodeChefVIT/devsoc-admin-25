import React from "react";
interface SelectGenderProps {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectGender({ gender, setGender }: SelectGenderProps) {
  return (
    <Select

      value={gender ?? ""}
      onValueChange={(value) => {
        setGender(value === "all" ? "" : value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genders</SelectItem>

        <SelectItem value="M">Male</SelectItem>
        <SelectItem value="F">Female</SelectItem>
        <SelectItem value="O">Other</SelectItem>
      </SelectContent>
    </Select>
  );
}
