"use client";

import {
  fetchScores,
  createScore,
  deleteScore,
  updateScore,
} from "@/api/fetchScores";
import { Score } from "@/app/team/[id]/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Row } from "@tanstack/react-table";
import { type ApiError } from "next/dist/server/api-utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ModalTestcaseUpdate = ({
  row,
  children,
}: {
  row: Row<Score>;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Score>();

  const createQuestion = useMutation({
    mutationFn: (data: Score) => {
      return toast.promise(
        updateScore({ scoreId: row.original.id, ...data }), // Corrected object structure
        {
          loading: "Updating Testcase",
          success: "Success!",
          error: (err: ApiError) => err.message,
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["testcases"] });
      setModalOpen(false);
    },
  });
  
  const onSubmit = (data: Score) => {
    createQuestion.mutate(data);
  };
  return (
    <div className="flex">
      <Dialog>
        {/* <Dialog open={isOpen} onOpenChange={setIsOpen}> */}
        <DialogTrigger asChild>
          <div className="w-full cursor-pointer rounded-sm p-1 text-left text-sm text-accent hover:bg-slate-200">
            {children}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Test Case</DialogTitle>
            <DialogDescription>Add test cases here</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalTestcaseUpdate;
