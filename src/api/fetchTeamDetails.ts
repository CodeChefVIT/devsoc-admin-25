import { TeamsFromSearch, type Team, type TeamResponse } from "@/data/schema";
import { TeamResponseSchema } from "@/data/schema";
import axios from "./axiosConfig";

export const fetchTeamDetails = async ({ uuid }: { uuid: string}) => {
  try {
    const response1 = await axios.get<TeamResponse>(
      `admin/teams/${uuid}`
    );
    // const response2 = await axios.get(`/admin/teams/leader/${uuid}`)
    const response3 = await axios.get<TeamsFromSearch>(`/admin/members/${uuid}`)
    console.log(response1.data.data.team )
    console.log(response3.data.data.team )
    return{
        team: response1.data.data.team,
        members: response3.data.data.team
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};