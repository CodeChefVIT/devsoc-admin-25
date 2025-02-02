import { type Team, type TeamsResponse } from "@/data/schema";
import { TeamsResponseSchema } from "@/data/schema";
import axios from "./axiosConfig";

export const fetchTeams = async ({
  limit,
  cursorId, 
  name
}: {
  limit: number;
  cursorId?: string; 
  name?:string;
}) => {
  try {

    const params = new URLSearchParams({ limit: String(limit) });

    if (name) {
      params.append("name", name);
    } else if (cursorId) {
      params.append("cursor", cursorId);
    }

    const url = `admin/teams?${params.toString()}`;


    const response = await axios.get<TeamsResponse>(url);

     const parsedResponse = TeamsResponseSchema.parse(response.data);
     const teams = parsedResponse.data.teams;
     const nextCursor = teams!=null ? teams[teams.length - 1]?.ID : null;

     return { teams, nextCursor };
    // return response.data.data.teams
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const setTeamRound = async (id: string, round: string) => {
  try{
    const response = await axios.post<TeamsResponse>("/admin/team/rounds",{id, role: round});
    return response.data
  }
  catch(err){
    console.log(err);
    throw err;
  }

}