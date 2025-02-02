"use client";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchTeams } from "@/api/fetchTeams";
import { fetchSubmission, type Submission } from "@/api/fetchIdeas";
import { type Team } from "@/data/schema";
import { type ColumnDef } from "@tanstack/react-table";

interface TeamData {
  id: string;
  name: string | null;
  numberOfPeople: number;
  roundQualified: number;
  submission: Submission | null;
}

export default function TeamsIdeasTable() {
  const [pageLimit, setPageLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TeamData[]>([]);
  const [availableTracks, setAvailableTracks] = useState<string[]>([]);

  const { data: teamsData, isLoading: teamsLoading, isError: teamsError } = useQuery({
    queryKey: ["teams", currentPage, pageLimit],
    queryFn: () => fetchTeams({ 
      limit: pageLimit,
      cursorId: undefined
    }),
  });

  const { data: processedData, isLoading: submissionsLoading } = useQuery({
    queryKey: ["teams-submissions", teamsData?.teams],
    queryFn: async () => {
      if (!teamsData?.teams) return [];
      
      const teamsWithSubmissions = await Promise.all(
        teamsData.teams.map(async (team: Team) => {
          if (!team.ID) return null;
          
          const submission = await fetchSubmission(team.ID);
          
          return {
            id: team.ID,
            name: team.Name,
            numberOfPeople: team.NumberOfPeople,
            roundQualified: team.RoundQualified,
            submission: submission
          } as TeamData;
        })
      );

      return teamsWithSubmissions.filter((team): team is TeamData => !!team);
    },
    enabled: !!teamsData?.teams,
  });

  useEffect(() => {
    if (processedData) {
      const tracks = new Set<string>();
      processedData.forEach(team => {
        if (team.submission?.track) {
          tracks.add(team.submission.track);
        }
      });
      setAvailableTracks(Array.from(tracks));
    }
  }, [processedData]);

  useEffect(() => {
    if (!processedData) return;

    const filtered = processedData.filter(team => {
      const matchesSearch = searchTerm
        ? (team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          (team.submission?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
        : true;

      const matchesTrack = selectedTrack
        ? team.submission?.track === selectedTrack
        : true;

      return matchesSearch && matchesTrack;
    });

    setFilteredData(filtered);
  }, [processedData, searchTerm, selectedTrack]);

  const columns: ColumnDef<TeamData, unknown>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Team Name" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("name") ?? "Unnamed Team"}
        </div>
      ),
    },
    {
      accessorKey: "numberOfPeople",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Team Size" />
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("numberOfPeople")}
        </div>
      ),
    },
    {
      id: "submissionTitle",
      accessorFn: (row) => row.submission?.title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Submission Title" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.submission?.title ?? "No submission"}
        </div>
      ),
    },
    {
      id: "submissionDescription",
      accessorFn: (row) => row.submission?.description,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">
          {row.original.submission?.description ?? "No description"}
        </div>
      ),
    },
    {
      id: "track",
      accessorFn: (row) => row.submission?.track,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Track" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.submission?.track ?? "Unassigned"}
        </div>
      ),
    },
  ];

  if (teamsLoading || submissionsLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-lg">Loading teams and submissions...</div>
      </div>
    );
  }

  if (teamsError) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-lg text-red-500">Error loading teams data</div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Teams & Submissions Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search teams or submissions..."
            className="w-64 rounded-md border border-gray-300 p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedTrack ?? "all"}
            onValueChange={(value) => setSelectedTrack(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tracks</SelectItem>
              {availableTracks.map((track) => (
                <SelectItem key={track} value={track}>
                  {track}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          handleNextPage={() => setCurrentPage(prev => prev + 1)}
          handlePrevPage={() => setCurrentPage(prev => prev - 1)}
          setPageLimit={setPageLimit}
          pageLimit={pageLimit}
        />
      </CardContent>
    </Card>
  );
}