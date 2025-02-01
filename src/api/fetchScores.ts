import axios from "./axiosConfig";
import { z } from "zod";

const scoreSchema = z.object({
   id: z.string(),
   team_id: z.string(),
   design: z.number(),
   implementation: z.number(),
   presentation: z.number(),
   innovation: z.number(),
   teamwork: z.number(),
    comment: z.string(),
    round: z.number(),
});
const scoresResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
 data: z.object({
    message: z.string(),
    scores: z.array(scoreSchema),
  }),
});


interface ScoreResponse extends z.infer<typeof scoreSchema>{}
interface CreateScoreRequest extends Omit<z.infer<typeof scoreSchema>, 'id'>{
    team_id: string;
}

export const fetchScores = async (teamId: string) => {
  try {
    const response = await axios.get<{
      status: string;
      message: string;
      data: {
        message: string;
        scores: ScoreResponse[];
      };
    }>(`panel/getscore/${teamId}`, {
      withCredentials: true,
    });
      const parsedResponse = scoresResponseSchema.parse(response.data);
      return parsedResponse.data.scores;
  } catch (err) {
    console.error(err)
    throw err;
  }
};


export const createScore = async ({
    team_id,
   design,
    implementation,
   presentation,
    innovation,
   teamwork,
   comment,
   round,
}: CreateScoreRequest) => {
  try {
     const response = await axios.post(
      `panel/createscore`,
      {
        design,
        implementation,
        presentation,
        innovation,
        teamwork,
        comment,
        team_id,
        round,
      },
        {
          withCredentials: true,
       }
    );
     return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteScore = async (scoreId: string) => {
  try {
    const response = await axios.delete(`panel/deletescore/${scoreId}`,{
          withCredentials: true,
        });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateScore = async ({
    scoreId,
    design,
    implementation,
   presentation,
    innovation,
   teamwork,
   comment,
   round
}: {
    scoreId:string,
    design:number,
    implementation:number,
   presentation:number,
    innovation:number,
   teamwork:number,
   comment:string,
     round:number,
}) => {
  try {
    const response = await axios.put(`panel/updatescore/${scoreId}`,
      {
           design,
          implementation,
            presentation,
            innovation,
          teamwork,
          comment,
            round
       },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};