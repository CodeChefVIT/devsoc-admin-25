import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
  import { type User } from "@/data/schema";
  import { Button } from "../ui/button";
import Link from "next/link";
  
  interface TeamModalProps {
    open: boolean;
    onClose: () => void;
    user: User;
  }
  
  export const UserModal = ({ open, onClose, user }: TeamModalProps) => {
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
              <div className="col-span-3 text-gray-100 font-medium">{user.ID}</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Name</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {user.FirstName} {user.LastName}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Email</div>
              <div className="col-span-3 text-gray-100 font-medium">{user.Email}</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Phone</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {user.PhoneNo ?? 'Not Provided'}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Gender</div>
              <div className="col-span-3 text-gray-100 font-medium">{user.Gender ?? 'Not Provided'}</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Github Profile</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {user.GithubProfile? 
                <Link href={`${user.GithubProfile}`} target="_blank">{user.GithubProfile}</Link>    
            :'Not Provided'}
            
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Role</div>
              <div className="col-span-3 text-gray-100 font-medium">{user.Role}</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Leader</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {user.IsLeader ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Verified</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {user.IsVerified ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Banned</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {user.IsBanned ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-gray-100">Profile Complete</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {user.IsProfileComplete ? 'Yes' : 'No'}
              </div>
            </div>
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
  