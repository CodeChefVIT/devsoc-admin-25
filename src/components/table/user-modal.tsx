"use";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { type User } from "@/data/schema";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { banUnban } from "@/api/ban";

interface TeamModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export const UserModal = ({ open, onClose, user }: TeamModalProps) => {
  const [isBanned, setIsBanned] = useState(user.IsBanned);
  const handleToggleBan =async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await banUnban({ ban: !isBanned, email: user.Email });
      if (response.message === "success") {
        console.log("user is now " + !isBanned)
        setIsBanned(!isBanned);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Here are details about the selected User
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">ID</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.ID}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Name</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.FirstName} {user.LastName}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Email</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.Email}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Phone</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.PhoneNo ?? "Not Provided"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Gender</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.Gender ?? "Not Provided"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Github Profile</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.GithubProfile ? (
                <Link href={`${user.GithubProfile}`} target="_blank">
                  {user.GithubProfile}
                </Link>
              ) : (
                "Not Provided"
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Role</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.Role}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Leader</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.IsLeader ? "Yes" : "No"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Verified</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.IsVerified ? "Yes" : "No"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Banned</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.IsBanned ? "Yes" : "No"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-gray-100">Profile Complete</div>
            <div className="col-span-3 font-medium text-gray-100">
              {user.IsProfileComplete ? "Yes" : "No"}
            </div>
          </div>
          <Toggle
            onClick={
              handleToggleBan}
            isBanned={isBanned}
          >
            {isBanned ? "Unban" : "Ban"}
          </Toggle>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
