"use client";
import { fetchTeamDetails } from "@/api/fetchTeamDetails";
import Image from "next/image";
import { useParams } from "next/navigation";
import loading from "@/assets/images/loading.gif";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useToast from "@/lib/toast";
import {  useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createScore, deleteScore, fetchScores, updateScore } from "@/api/fetchScores";


interface Score {
  id: string;
  team_id: string;
  design: number;
  implementation: number;
  presentation: number;
  innovation: number;
  teamwork: number;
  comment: string;
  round: number;
}

type ApiError = {
  message: string;
};

function ScoreSection({ teamId }: { teamId: string }) {
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
  const { create } = useToast();

  const { data: scores = [], isLoading: scoresLoading, isError: scoresError } = useQuery({
    queryKey: ["scores", teamId],
    queryFn: () => fetchScores(teamId ?? ""),
    enabled: !!teamId,
  });

  const createScoreMutation = useMutation({
    mutationFn: ({ teamId, design, implementation, presentation, innovation, teamwork, comment, round }: {
      teamId: string;
      design: number;
      implementation: number;
      presentation: number;
      innovation: number;
      teamwork: number;
      comment: string;
      round: number;
    }) => createScore({ team_id: teamId, design, implementation, presentation, innovation, teamwork, comment, round }),
    onError: (err: ApiError) => {
      create(`Error creating score: ${err?.message ?? "unknown error"}`, "error");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["scores", teamId] });
      resetForm();
    },
  });

  const deleteScoreMutation = useMutation({
    mutationFn: (scoreId: string) => deleteScore(scoreId),
    onError: (err: ApiError) => {
      create(`Error deleting score: ${err?.message ?? "unknown error"}`, "error");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["scores", teamId] });
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
      round,
      team_id: teamId || ''
    }),
    onError: (err: ApiError) => {
      create(`Error updating score: ${err?.message ?? "unknown error"}`, "error");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["scores", teamId] });
      setEditMode(false);
      resetForm();
    },
  });

  const resetForm = () => {
    setDesign(0);
    setImplementation(0);
    setPresentation(0);
    setInnovation(0);
    setTeamwork(0);
    setComment("");
    setRound(0);
    setCurrentScoreId(null);
    setEditMode(false);
  };

  const handleEdit = (score: Score) => {
    setCurrentScoreId(score.id);
    setDesign(score.design);
    setImplementation(score.implementation);
    setPresentation(score.presentation);
    setInnovation(score.innovation);
    setTeamwork(score.teamwork);
    setComment(score.comment);
    setRound(score.round);
    setEditMode(true);
  };

  const handleSubmit = async() => {
    if (!teamId) return;

    try {
      if (editMode && currentScoreId) {
        await updateScoreMutation.mutateAsync({
          scoreId: currentScoreId,
          design,
          implementation,
          presentation,
          innovation,
          teamwork,
          comment,
          round
        });
      } else {
        await createScoreMutation.mutateAsync({
          teamId,
          design,
          implementation,
          presentation,
          innovation,
          teamwork,
          comment,
          round
        });
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const handleDelete = (scoreId: string) => {
    if (window.confirm("Are you sure you want to delete this score?")) {
      void deleteScoreMutation.mutateAsync(scoreId);
    }
  };

  const calculateTotalScore = (score: Score) => {
    return score.design + score.implementation + score.presentation +
      score.innovation + score.teamwork;
  };

  if (scoresLoading) return <div>Loading scores...</div>;
  if (scoresError) return <div>Error loading scores</div>;

  const showForm = !scores || scores.length === 0 || editMode;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Team Scores</h2>
      
      {showForm && (
        <div className="space-y-4 bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">{editMode ? "Edit Score" : "Add Score"}</h3>
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
          <div className="space-x-2">
            <Button 
              onClick={handleSubmit}
              disabled={updateScoreMutation.isPending || createScoreMutation.isPending}
            >
              {editMode ? "Update Score" : "Add Score"}
            </Button>
            {editMode && (
              <Button 
                variant="secondary" 
                onClick={() => {
                  resetForm();
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}

      {scores && scores.length > 0 && !editMode && scores.map((score: Score) => (
        <div key={score.id} className="bg-gray-800 rounded-lg p-4 space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">
              Total Score: {calculateTotalScore(score)}
            </div>
            <div className="space-x-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => handleEdit(score)}
              >
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleDelete(score.id)}
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
        </div>
      ))}
    </div>
  );
}

interface Member {
  FirstName?: string | undefined;
  LastName?: string | undefined;
  Email?: string | undefined;
  RegNo?: string | null;
  PhoneNo?: string | null;
}

// Team interface to match API response
interface Team {
  ID: string;
  Name: string;
  NumberOfPeople: number;
  RoundQualified: number;
  Code: string;
  IsBanned: boolean;
}

// Idea interface to match API response
interface Idea {
  ID: string;
  Title: string;
  Description: string;
  Track: string;
}

// Submission interface to match API response
interface Submission {
  ID: string;
  Title: string;
  Description: string;
  Track: string;
  GithubLink: string;
  FigmaLink: string;
  OtherLink: string;
  TeamID: string;
}

// Expected API response structure
interface TeamResponse {
  idea: Idea;
  score: string|number | null;
  submission: Submission;
  team: Team;
  team_members: Member[];
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="mb-2 rounded-md border bg-black p-3 text-white shadow-md">
      <p className="font-semibold">
        {member.FirstName} {member.LastName}
      </p>
      <p>Email: {member.Email}</p>
      <p>Registration Number: {member.RegNo}</p>
      <p>Phone: {member.PhoneNo}</p>
    </div>
  );
}

export default function TheTeam() {
  const { id } = useParams();
  console.log(id);
  const {
    data: teamList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["theTeams", id],
    queryFn: () => fetchTeamDetails({ uuid: String(id )}),
    enabled: !!id,
  });
  return (
    <>
     <div className="mx-auto w-[100%] space-y-4">
     {id && <ScoreSection teamId={String(id)} />}
      <div
        className={`${!teamList ? "h-[70vh]" : "h-auto"} mx-auto w-[100%] rounded-md border bg-black p-4 text-white shadow-lg`}
      >
        {/* Input field for UUID */}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center">
            <Image
              className="w-[50%]"
              src={loading}
              width={100}
              height={100}
              alt="Loading..."
            />
          </div>
        )}

        {/* Error Message */}
        {isError && (
          <div className="text-red-500">Error fetching team data</div>
        )}

        {teamList && (
          <div className="rounded-md border bg-black p-3 text-white shadow-md">
            <h2 className="py-2 text-xl font-bold">Team Information</h2>
            <p>ID: {teamList.team.ID}</p>
            <p>Name: {teamList.team.Name}</p>
            <p>Number of People: {teamList.team.NumberOfPeople}</p>
            <p>Round Qualified: {teamList.team.RoundQualified}</p>
            <p>Code: {teamList.team.Code}</p>
            <p>Banned: {teamList.team.IsBanned ? "Yes" : "No"}</p>

            <h2 className="mt-4 py-2 text-xl font-bold">Idea Information</h2>
            <p>ID: {teamList.idea.ID}</p>
            <p>Title: {teamList.idea.Title}</p>
            <p>Description: {teamList.idea.Description}</p>
            <p>Track: {teamList.idea.Track}</p>

            <h2 className="mt-4 py-2 text-xl font-bold">
              Submission Information
            </h2>
            <p>ID: {teamList.submission.ID}</p>
            <p>Title: {teamList.submission.Title}</p>
            <p>Description: {teamList.submission.Description}</p>
            <p>Track: {teamList.submission.Track}</p>
            <p>
              GitHub Link:{" "}
              <Link
                href={String(teamList.submission.GithubLink)}
                target="_blank"
                className="text-blue-400 underline"
              >
                {String(teamList.submission.GithubLink)}
              </Link>
            </p>
            <p>
              Figma Link:{" "}
              <Link
                href={String(teamList.submission.FigmaLink)}
                target="_blank"
                className="text-blue-400 underline"
              >
                {teamList.submission.FigmaLink}
              </Link>
            </p>
            <p>
              Other Link:{" "}
              <Link
                href={String(teamList.submission.OtherLink)}
                target="_blank"
                className="text-blue-400 underline"
              >
                {teamList.submission.OtherLink}
              </Link>
            </p>

            <h2 className="mt-4 py-2 text-xl font-bold">Team Members</h2>
            {teamList.team_members.map((member) => (
              <MemberCard key={member.Email} member={member} />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
