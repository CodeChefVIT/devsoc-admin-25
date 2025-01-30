import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
  import { type Team } from "@/data/schema";
import { Button } from "../ui/button";
  
  interface TeamModalProps{
      open: boolean;
      onClose: () => void;
      team: Team;
  }
  export const TeamModal = ({open, onClose, team}: TeamModalProps) => {
      return (<Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>Team Details</DialogTitle>
                  <DialogDescription>
                   Here are details about the selected Team
                  </DialogDescription>
              </DialogHeader>
                <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 gap-2">
                              <div className="text-gray-100">ID</div>
                               <div className="col-span-3 text-gray-100 font-medium">{team.ID}</div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                              <div className="text-gray-100">Name</div>
                               <div className="col-span-3 text-gray-100 font-medium">{team.Name}</div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                               <div className="text-gray-100">Members</div>
                               <div className="col-span-3 text-gray-100 font-medium">{team.NumberOfPeople}</div>
                          </div>
                           <div className="grid grid-cols-4 gap-2">
                              <div className="text-gray-100">Code</div>
                               <div className="col-span-3 text-gray-100 font-medium">{team.Code}</div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                              <div className="text-gray-100">Round</div>
                               <div className="col-span-3 text-gray-100 font-medium">{team.RoundQualified}</div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                              <div className="text-gray-100">Banned</div>
                               <div className="col-span-3 text-gray-100 font-medium">{team.IsBanned ? 'Yes': 'No'}</div>
                          </div>
                       </div>
                 <div className="flex justify-end">
                  <DialogClose asChild>
                  <Button>Close</Button>
                  </DialogClose>
                </div>
              </DialogContent>
           </Dialog>
      )
  }