import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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

    // const [newScore, setNewScore] = useState("");
    // const [editScore, setEditScore] = useState<Score | null>(null);
    const [design, setDesign] = useState(0);
    const [implementation, setImplementation] = useState(0);
    const [presentation, setPresentation] = useState(0);
    const [innovation, setInnovation] = useState(0);
    const [teamwork, setTeamwork] = useState(0);
    const [comment, setComment] = useState("");
    const [round, setRound] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [currentScoreId, setCurrentScoreId] = useState<string | null>(null);

    const queryClient = useQueryClient();
    const {create} = useToast();


    const {data: scores = [], isLoading, isError, failureReason} = useQuery({
        queryKey: ["scores", team.ID],
         queryFn: () => fetchScores(team.ID || ""),
         enabled: !!team.ID,
    })


    const createScoreMutation = useMutation({
        mutationFn: ({ teamId, design, implementation, presentation, innovation, teamwork, comment, round }: {
            teamId: string,
            design: number,
            implementation: number,
            presentation: number,
            innovation: number,
            teamwork: number,
            comment: string,
            round: number
        }) => createScore({ team_id: teamId, design, implementation, presentation, innovation, teamwork, comment, round }),
        onError: (err: any) => {
            create(`Error creating score: ${err?.message ?? "unknown error"}`, "error");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scores", team.ID] });
            resetForm();
        },
    });

    const deleteScoreMutation = useMutation({
        mutationFn: (scoreId: string) => deleteScore(scoreId),
        onError: (err: any) => {
            create(`Error deleting score: ${err?.message ?? "unknown error"}`, "error");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scores", team.ID] });
            setEditMode(false);
            resetForm();
        },
    });
    const updateScoreMutation = useMutation({
        mutationFn: ({
            scoreId,
            design,
            implementation,
            presentation,
            innovation,
            teamwork,
            comment,
            round,
           
        }: {
            scoreId: string;
            design: number;
            implementation: number;
            presentation: number;
            innovation: number;
            teamwork: number;
            comment: string;
            round: number;
           
        }) => updateScore({
            scoreId,
            design,
            implementation,
            presentation,
            innovation,
            teamwork,
            comment,
            round
        }),
        onError: (err: any) => {
            create(`Error updating score: ${err?.message ?? "unknown error"}`, "error");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scores", team.ID] });
            setEditMode(false);
            resetForm();
        },
    });

    const handleUpdateScore = async () => {
        if (!currentScoreId) return;
        if(isNaN(Number(design)) || isNaN(Number(implementation)) || isNaN(Number(presentation)) || isNaN(Number(innovation))|| isNaN(Number(teamwork)) || isNaN(Number(round))){
            create("The score should be a number","error");
          return;
        }
        await updateScoreMutation.mutateAsync({
           scoreId: currentScoreId,
           design,
           implementation,
           presentation,
           innovation,
           teamwork,
           comment,
            round,
        });
    };
    const resetForm = () => {
        setDesign(0);
        setImplementation(0);
        setPresentation(0);
        setInnovation(0);
        setTeamwork(0);
        setComment("");
        setRound(0);
        setCurrentScoreId(null);
    };

  const handleCreateScore = async ()=>{
      if(!team.ID) return;
    if(isNaN(Number(design)) || isNaN(Number(implementation)) || isNaN(Number(presentation)) || isNaN(Number(innovation))|| isNaN(Number(teamwork)) || isNaN(Number(round))){
          create("The score should be a number","error");
          return;
      }
      await createScoreMutation.mutateAsync({teamId: team.ID, design, implementation, presentation, innovation, teamwork, comment, round});
  }

    const handleScoreDelete = async (scoreId: string) => {
        try {
            await deleteScoreMutation.mutateAsync(scoreId);
        } catch (error) {
            console.error('Error deleting score:', error);
        }
    };


    const handleScoreEdit = (score: Score) => {
        setEditMode(true);
        setCurrentScoreId(score.id);
        setDesign(score.design);
        setImplementation(score.implementation);
        setPresentation(score.presentation);
        setInnovation(score.innovation);
        setTeamwork(score.teamwork);
        setComment(score.comment);
        setRound(score.round);
    };
    // const handleCancelEdit = () => {
    //   setEditScore(null);
    //      setDesign(0);
    //       setImplementation(0);
    //         setPresentation(0);
    //          setInnovation(0);
    //          setTeamwork(0)
    //      setComment("");
    //     setRound(0);
    // };
    
    const calculateTotalScore = (score: Score) => {
        return score.design + score.implementation + score.presentation + 
               score.innovation + score.teamwork;
    };


    useEffect(() => {
        if (!open) {
            resetForm();
            setEditMode(false);
        }
    }, [open]);

    const showAddScoreForm = (!scores || scores.length === 0) && !editMode;

    return (
        <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Team Details</DialogTitle>
                <DialogDescription>
                    Here are details about the selected Team
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div className="grid gap-2">
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
                        <div className="col-span-3 text-gray-100 font-medium">{team.IsBanned ? 'Yes' : 'No'}</div>
                    </div>
                </div>

                {(!scores || scores.length === 0) && !editMode && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Add Score</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Design</Label>
                                <Input type="number" value={design} onChange={(e) => setDesign(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Implementation</Label>
                                <Input type="number" value={implementation} onChange={(e) => setImplementation(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Presentation</Label>
                                <Input type="number" value={presentation} onChange={(e) => setPresentation(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Innovation</Label>
                                <Input type="number" value={innovation} onChange={(e) => setInnovation(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Teamwork</Label>
                                <Input type="number" value={teamwork} onChange={(e) => setTeamwork(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Round</Label>
                                <Input type="number" value={round} onChange={(e) => setRound(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Comment</Label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-24 resize-none"
                            />
                        </div>
                        <Button onClick={handleCreateScore} disabled={createScoreMutation.isPending}>
                            Add Score
                        </Button>
                    </div>
                )}

                {isLoading ? (
                    <div>Loading scores...</div>
                ) : isError ? (
                    <div>Error: {failureReason instanceof Error ? failureReason.message : "Unknown error"}</div>
                ) : scores?.map((score: Score) => (
                    <div key={score.id} className="bg-gray-800 rounded-lg p-4 space-y-4">
                        {editMode && currentScoreId === score.id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Design</Label>
                                        <Input type="number" value={design} onChange={(e) => setDesign(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Implementation</Label>
                                        <Input type="number" value={implementation} onChange={(e) => setImplementation(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Presentation</Label>
                                        <Input type="number" value={presentation} onChange={(e) => setPresentation(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Innovation</Label>
                                        <Input type="number" value={innovation} onChange={(e) => setInnovation(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Teamwork</Label>
                                        <Input type="number" value={teamwork} onChange={(e) => setTeamwork(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Round</Label>
                                        <Input type="number" value={round} onChange={(e) => setRound(Number(e.target.value))} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Comment</Label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-24 resize-none"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button onClick={handleUpdateScore} disabled={updateScoreMutation.isPending}>
                                        Save
                                    </Button>
                                    <Button variant="secondary" onClick={() => {
                                        setEditMode(false);
                                        resetForm();
                                    }}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center">
                                    <div className="text-xl font-bold">
                                        Total Score: {calculateTotalScore(score)}
                                    </div>
                                    <div className="space-x-2">
                                        <Button size="sm" variant="secondary" onClick={() => handleScoreEdit(score)}>
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => deleteScoreMutation.mutateAsync(score.id)}
                                            disabled={deleteScoreMutation.isPending}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>Design: {score.design}</div>
                                    <div>Implementation: {score.implementation}</div>
                                    <div>Presentation: {score.presentation}</div>
                                    <div>Innovation: {score.innovation}</div>
                                    <div>Teamwork: {score.teamwork}</div>
                                    <div>Round: {score.round}</div>
                                </div>
                                {score.comment && (
                                    <div>
                                        <span className="font-medium">Comment:</span> {score.comment}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </DialogContent>
    </Dialog>
    );
};