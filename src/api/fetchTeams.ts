import { type Team, type TeamsResponse } from "@/data/schema";
import { TeamsResponseSchema } from "@/data/schema";
import axios from "./axiosConfig";

export const fetchTeams = async ({
  limit,
  cursorId, 
}: {
  limit: number;
  cursorId?: string; 
}) => {
  try {

    const url = cursorId
      ? `admin/teams?limit=${limit}&cursor=${cursorId}`
      : `admin/teams?limit=${limit}`;

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