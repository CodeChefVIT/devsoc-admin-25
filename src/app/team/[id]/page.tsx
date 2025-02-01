"use client";
import { fetchTeamDetails } from "@/api/fetchTeamDetails";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import loading from "@/assets/images/loading.gif";
import Link from "next/link";

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
    </>
  );
}
