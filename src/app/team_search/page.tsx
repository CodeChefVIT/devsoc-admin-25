"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamDetails } from "@/api/fetchTeamDetails";
import { useState } from "react";
import Image from "next/image";
import loading from "@/assets/images/loading.gif";
import Link from "next/link";

// Member interface to match API response
interface Member {
  FirstName: string;
  LastName: string;
  IsLeader: boolean;
  GithubProfile: string;
  RegNo: string;
  PhoneNo: string;
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

// Expected API response structure
interface TeamResponse {
  team: Team;
  members: Member[];
}

// MemberCard component to display member details
function MemberCard({ member }: { member: Member }) {
  return (
    <div className="border p-3 rounded-md shadow-md bg-black text-white mb-2">
      <p className="font-semibold">
        {member.FirstName} {member.LastName} ({member.IsLeader ? "Leader" : "Member"})
      </p>
      <p>Registration Number: {member.RegNo}</p>
      <p>Phone: {member.PhoneNo}</p>
      <p>
        GitHub Profile:{" "}
        <Link
          href={member.GithubProfile}
          target="_blank"
          
          className="text-blue-400 underline"
        >
          {member.GithubProfile}
        </Link>
      </p>
    </div>
  );
}

// Main component
export default function TeamSearch() {
  // const [uuid, setUuid] = useState<string>("");

  // const {
  //   data: teamList,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["theTeams", uuid],
  //   queryFn: () => fetchTeamDetails({ uuid }),
  //   enabled: !!uuid,
  // });

  return (<></>
    // <div className={`${!teamList? "h-[70vh]": "h-auto"} w-[100%] mx-auto p-4 border rounded-md shadow-lg bg-black text-white`}>
    //   Input field for UUID
    //   <div className="flex flex-col items-center mb-4">
    //     <input
    //       className="w-[50%] p-2 border rounded-md bg-gray-800 text-white"
    //       placeholder="Enter team ID"
    //       value={uuid}
    //       onChange={(e) => setUuid(e.target.value)}
    //       type="text"
    //     />
    //   </div>

    //   {/* Loading Indicator */}
    //   {isLoading && (
    //     <div className="flex justify-center">
    //       <Image className="w-[50%]" src={loading} width={100} height={100} alt="Loading..." />
    //     </div>
    //   )}

    //   {/* Error Message */}
    //   {isError && <div className="text-red-500">Error fetching team data</div>}

    //   {/* Display Team Details */}
    //   {teamList && (
    //     <div className="p-3 border rounded-md shadow-md bg-black text-white">
    //       <h2 className="text-xl font-bold py-2">Team Information</h2>
    //       <p>ID: {teamList.team.ID}</p>
    //       <p>Name: {teamList.team.Name}</p>
    //       <p>Number of People: {teamList.team.NumberOfPeople}</p>
    //       <p>Round Qualified: {teamList.team.RoundQualified}</p>
    //       <p>Code: {teamList.team.Code}</p>
    //       <p>Banned: {teamList.team.IsBanned ? "Yes" : "No"}</p>

    //       {/* Display Members */}
    //       <h2 className="text-xl font-bold mt-4 py-2">Team Members</h2>
    //       {teamList.members.map((member) => (
    //         <MemberCard key={member.RegNo} member={member} />
    //       ))}
    //       {teamList.members.map((member) => (
    //         <MemberCard key={member.RegNo} member={member} />
    //       ))}
    //     </div>
    //   )}
    // </div>

  );
}
