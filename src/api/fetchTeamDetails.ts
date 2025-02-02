import { TeamsFromSearch, type Team, type TeamResponse } from "@/data/schema";
import { type MainSearch, MainTeamSearchResponse} from "@/data/schema";

import axios from "./axiosConfig";


export const fetchTeamDetails = async ({ uuid }: { uuid: string }) => {
  try {
    const response = await axios.get<MainSearch>(
      `admin/teams/${uuid}`
    );
    // console.log(response)
    const parsedResponse = MainTeamSearchResponse.parse(response.data)
    console.log(parsedResponse)
    return parsedResponse.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


