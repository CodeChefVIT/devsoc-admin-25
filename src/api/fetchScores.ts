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
  message: z.string(),
  data: z.object({
    scores: z.array(scoreSchema)
  }).optional()
});

const createUpdateResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    message: z.string()
  }).optional()
});

const deleteResponseSchema = z.object({
  status: z.string(),
  message: z.string()
});

type ScoreResponse = z.infer<typeof scoreSchema>;

interface CreateScoreRequest extends Omit<z.infer<typeof scoreSchema>, 'id'> {
  team_id: string;
}

interface UpdateScoreRequest extends Partial<Omit<CreateScoreRequest, 'team_id'>> {
  scoreId: string;
  team_id?: string;
}

export const fetchScores = async (teamId: string): Promise<ScoreResponse[]> => {
  try {
    const response = await axios.get<{
      status: string;
      message: string;
      data?: {
        message?: string;
        scores?: ScoreResponse[];
      };
    }>(`panel/getscore/${teamId}`, {
      withCredentials: true,
    });
    const parsedResponse = scoresResponseSchema.parse(response.data);
    return parsedResponse.data?.scores ?? [];
  } catch (err: any) {
    if (err.response?.status === 404) {
      return [];
    }
    throw new Error(err.response?.data?.message || 'Failed to fetch scores');
  }
};

export const createScore = async (data: CreateScoreRequest) => {
  try {
    const response = await axios.post(
      'panel/createscore',
      data,
      {
        withCredentials: true,
      }
    );
    const parsedResponse = createUpdateResponseSchema.parse(response.data);
    return parsedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to create score');
  }
};

export const deleteScore = async (scoreId: string) => {
  try {
    const response = await axios.delete(`panel/deletescore/${scoreId}`, {
      withCredentials: true,
    });
    
    const parsedResponse = deleteResponseSchema.parse(response.data);
    return parsedResponse;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to delete score');
  }
};

export const updateScore = async (data: UpdateScoreRequest) => {
  try {
    const response = await axios.put(
      `panel/updatescore/${data.scoreId}`,
      data,
      {
        withCredentials: true,
      }
    );
    const parsedResponse = createUpdateResponseSchema.parse(response.data);
    return parsedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to update score');
  }
};