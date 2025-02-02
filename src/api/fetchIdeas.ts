import axios from "./axiosConfig";
import { z } from "zod";

const submissionSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  track: z.string().nullable(),
  github_link: z.string().nullable(),
  figma_link: z.string().nullable(),
  other_link: z.string().nullable(),
  team_id: z.string()
});

const submissionResponseSchema = z.object({
  status: z.string(),
  data: submissionSchema.nullable()
});

export type Submission = z.infer<typeof submissionSchema>;
export type SubmissionResponse = z.infer<typeof submissionResponseSchema>;

export const fetchSubmission = async (teamId: string): Promise<Submission | null> => {
  try {
    const response = await axios.get(`/submission/get`, {
      params: { teamId },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });

    const parsedResponse = submissionResponseSchema.parse(response.data);
    
    if (parsedResponse.status === "success" && parsedResponse.data) {
      return parsedResponse.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching submission for team ${teamId}:`, error);
    return null;
  }
};