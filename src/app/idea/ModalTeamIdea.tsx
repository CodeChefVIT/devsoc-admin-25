"use client";
import { type ideaType } from "@/api/fetchIdeas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Lightbulb } from "lucide-react";

export const ModalTeamIdea = ({
  children,
  row,
}: {
  children: React.ReactNode;
  row: ideaType;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Lightbulb className="h-6 w-6 text-yellow-500" /> Idea Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Here are details about the selected idea.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full gap-6 py-4">
          <div className="flex items-center gap-2 text-lg">
            Idea Title: {row.Title}
          </div>
          <div>
            <div className="break-words text-base">Description:</div>
            <div className="break-all text-base">{row.Description}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
