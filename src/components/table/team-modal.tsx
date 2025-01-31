import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { type Team } from "@/data/schema";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {  useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createScore, deleteScore, fetchScores, updateScore } from "@/api/fetchScores";
import useToast from "@/lib/toast";


interface TeamModalProps {
    open: boolean;
    onClose: () => void;
    team: Team;
}

interface Score {
  id: string;
    team_id: string;
  design: number;
    implementation: number;
  presentation: number;
    innovation: number;
     teamwork: number;
        comment: string;
      round: number
}


export const TeamModal = ({ open, onClose, team }: TeamModalProps) => {

  const [newScore, setNewScore] = useState("");
    const [editScore, setEditScore] = useState<Score | null>(null);
     const [design, setDesign] = useState(0);
      const [implementation, setImplementation] = useState(0);
    const [presentation, setPresentation] = useState(0);
    const [innovation, setInnovation] = useState(0);
   const [teamwork, setTeamwork] = useState(0);
      const [comment, setComment] = useState("");
    const [round, setRound] = useState(0);

    const queryClient = useQueryClient();
       const {create} = useToast();


    const {data: scores, isLoading, isError, isFetching, failureReason} = useQuery({
        queryKey: ["scores", team.ID],
         queryFn: () => fetchScores(team.ID || ""),
         enabled: !!team.ID,
    })


    const createScoreMutation = useMutation({
      mutationFn: ({teamId, design, implementation, presentation, innovation, teamwork, comment, round}:{teamId:string, design:number, implementation:number, presentation:number, innovation: number, teamwork:number, comment: string, round:number}) => createScore({team_id: teamId, design, implementation, presentation, innovation, teamwork, comment, round}),
         onError: (err:any)=>{
            create(`Error creating score: ${err?.message ?? "unknown error"}`, "error")
         },
         onSuccess: () => {
             queryClient.invalidateQueries({queryKey: ["scores", team.ID]})
          setNewScore("");
          setDesign(0);
          setImplementation(0);
          setPresentation(0);
          setInnovation(0);
          setTeamwork(0);
         setComment("");
         setRound(0)
        },
    });

     const deleteScoreMutation = useMutation({
      mutationFn: (scoreId: string) => deleteScore(scoreId),
          onError: (err:any)=>{
            create(`Error deleting score: ${err?.message ?? "unknown error"}`, "error")
          },
         onSuccess: () => {
             queryClient.invalidateQueries({queryKey: ["scores", team.ID]})
        },
    });
    const updateScoreMutation = useMutation({
      mutationFn: ({scoreId, design, implementation, presentation, innovation, teamwork, comment, round}:{scoreId: string, design:number, implementation:number, presentation:number, innovation: number, teamwork:number, comment: string, round:number}) => updateScore({scoreId, design, implementation, presentation, innovation, teamwork, comment, round}),
          onError: (err:any)=>{
            create(`Error updating score: ${err?.message ?? "unknown error"}`, "error")
         },
          onSuccess: () => {
             queryClient.invalidateQueries({queryKey: ["scores", team.ID]})
            setEditScore(null);
        },
    });



  const handleCreateScore = async ()=>{
      if(!team.ID) return;
    if(isNaN(Number(design)) || isNaN(Number(implementation)) || isNaN(Number(presentation)) || isNaN(Number(innovation))|| isNaN(Number(teamwork)) || isNaN(Number(round))){
          create("The score should be a number","error");
          return;
      }
      await createScoreMutation.mutateAsync({teamId: team.ID, design, implementation, presentation, innovation, teamwork, comment, round});
  }

   const handleScoreDelete = async (scoreId: string) => {
        await deleteScoreMutation.mutateAsync(scoreId);
    }


    const handleScoreEdit = (score: Score) => {
        setEditScore(score);
          setDesign(score.design);
          setImplementation(score.implementation);
            setPresentation(score.presentation);
             setInnovation(score.innovation);
             setTeamwork(score.teamwork)
        setComment(score.comment);
       setRound(score.round);
    };
    const handleCancelEdit = () => {
      setEditScore(null);
         setDesign(0);
          setImplementation(0);
            setPresentation(0);
             setInnovation(0);
             setTeamwork(0)
         setComment("");
        setRound(0);
    };

    const handleUpdateScore = async (scoreId:string, score:Score)=>{
        if(!editScore) return;
         await updateScoreMutation.mutateAsync({scoreId, design: score.design, implementation: score.implementation, presentation: score.presentation, innovation:score.innovation, teamwork: score.teamwork, comment:score.comment, round: score.round});
    }


    useEffect(()=>{
      if(!open) setEditScore(null);
    },[open])

    return (
      <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[700px] flex items-center justify-center">
            <div className = "relative w-[90%]">
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
                    <div className="mt-4">
                    <h2 className="text-lg font-semibold">Scores</h2>
                         <div className = "grid grid-cols-2 gap-2">
                              <div className = "flex flex-col gap-1">
                                    <Label>Design</Label>
                                     <Input
                                         type="text"
                                          value={String(design)}
                                          onChange={(e)=>setDesign(Number(e.target.value))}
                                     />
                                </div>
                               <div className = "flex flex-col gap-1">
                                    <Label>Implementation</Label>
                                         <Input
                                             type="text"
                                             value={String(implementation)}
                                              onChange={(e)=>setImplementation(Number(e.target.value))}
                                        />
                               </div>
                              <div className = "flex flex-col gap-1">
                                    <Label>Presentation</Label>
                                    <Input
                                             type="text"
                                              value={String(presentation)}
                                             onChange={(e)=>setPresentation(Number(e.target.value))}
                                        />
                              </div>
                            <div className = "flex flex-col gap-1">
                                   <Label>Innovation</Label>
                                         <Input
                                             type="text"
                                             value={String(innovation)}
                                           onChange={(e)=>setInnovation(Number(e.target.value))}
                                        />
                              </div>
                           <div className = "flex flex-col gap-1">
                                 <Label>Teamwork</Label>
                             <Input
                                  type="text"
                                value={String(teamwork)}
                              onChange={(e)=>setTeamwork(Number(e.target.value))}
                           />
                        </div>
                        <div className = "flex flex-col gap-1">
                            <Label>Comment</Label>
                            <textarea
                                placeholder = "Comment"
                                    value = {comment}
                                onChange = {(e)=> setComment(e.target.value)}
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-24 resize-none"
                           />
                        </div>
                        <div className = "flex flex-col gap-1">
                            <Label>Round</Label>
                            <Input
                            type = "text"
                                    value = {String(round)}
                                    onChange = {(e)=> setRound(Number(e.target.value))}
                            />
                        </div>
                                            
                        <Button disabled={createScoreMutation.isPending} onClick={handleCreateScore} className = "mt-2">
                                Add
                        </Button>
                    </div>
                       {isLoading ? <>Loading Scores...</> : isError ? <>Error Fetching Scores: {failureReason instanceof Error ? failureReason.message : "Unknown Error"}</> : scores && scores?.map((score:any) =>
                         (<div className="flex justify-between items-center mt-2 p-2 bg-gray-100 rounded-md" key={score.id}>
                            {editScore?.id == score.id ?
                            <div className="flex gap-2 items-center">
                                    <Input
                                            className="w-[100px]"
                                            defaultValue = {String(score.score)}
                                             onChange={(e)=>setEditScore((prev)=> ({...prev, score: Number(e.target.value), id: score.id, team_id: score.team_id, design: score.design, implementation: score.implementation, presentation: score.presentation, innovation: score.innovation, teamwork: score.teamwork, comment: score.comment, round: score.round }))}
                                    />
                                <div className="flex gap-1">
                                    <Button disabled={updateScoreMutation.isPending} onClick={()=> {
                                        if(editScore){
                                            handleUpdateScore(editScore.id, editScore)
                                        }
                                    }}>Save</Button>
                                     <Button onClick = {handleCancelEdit} variant={"destructive"}>Cancel</Button>
                               </div>
                             </div> :
                           <div className="flex items-center gap-4">
        
                                <span>Score: {score.score}</span>
                            </div>
                            }
                          <div>
                                 {editScore?.id !== score.id && <Button size={"sm"} variant={"secondary"} onClick={()=>handleScoreEdit(score)}>Edit</Button>}
        
                            <Button
                             disabled = {deleteScoreMutation.isPending} size = "sm"
                              onClick = {()=>handleScoreDelete(score.id)} variant={"destructive"} > Delete</Button>
        
                          </div>
                        </div>)
                      )}
                  </div>
                 </div>
            </DialogContent>
      </Dialog>
    );
};