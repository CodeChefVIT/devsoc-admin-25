import axios from "./axiosConfig";
import { z } from "zod";

const submissionSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  track: z.string().nullable(),
  github_link: z.string().nullable(),
  figma_link: z.string().nullable(),
  other_link: z.string().nullable(),
  team_id: z.string(),
});

const submissionResponseSchema = z.object({
  status: z.string(),
  data: submissionSchema.nullable(),
});

export type Submission = z.infer<typeof submissionSchema>;

export type SubmissionResponse = z.infer<typeof submissionResponseSchema>;

const ideaSchema = z.object({
  ID: z.string(), // UUID format for IDs
  Title: z.string(),
  Description: z.string(),
  Track: z.string(),
  TeamID: z.string(),
  IsSelected: z.boolean(),
  CreatedAt: z.string(), // ISO 8601 date string
  UpdatedAt: z.string(), // ISO 8601 date string
});

export const ideasResponseSchema = z.object({
  status: z.string(), // Ensures the status is always "success"
  message: z.string(),
  data: z.array(ideaSchema),
});
export type ideaType = z.infer<typeof ideaSchema>;

export type ideaResponseType = z.infer<typeof ideasResponseSchema>;





export const fetchIdeas = async ({
  limit,
  cursorId,
  name,
}: {
  limit: number;
  cursorId?: string;
  name?: string;}
) => {
  try {
    const params = new URLSearchParams({ limit: String(limit) });

    if (name) {
      params.append("name", name);
    } else if (cursorId) {
      params.append("cursor", cursorId);
    }

    const response = await axios.get<ideaResponseType>(`admin/ideas`);
    const parsedResponse = ideasResponseSchema.parse(response.data);
    console.log(parsedResponse.data);
    const nextCursor = 2;

    return {
      idea: parsedResponse.data,
      nextCursor,
    };
    } catch (err) {
    console.log(err);
    throw err;
  }
};
