import { type Team, type TeamsResponse } from "@/data/schema";
import { TeamsResponseSchema } from "@/data/schema";
import axios from "./axiosConfig";

export const fetchTeams = async ({ page, limit }: { page: number; limit: number }) => {
  try {
    const response = await axios.get<TeamsResponse>(
      `admin/teams?page=${page}&limit=${limit}`
    );
     const parsedResponse = TeamsResponseSchema.parse(response.data);
    return  { teams: parsedResponse.data.teams };
  } catch (err) {
    console.log(err);
    throw err;
  }
};