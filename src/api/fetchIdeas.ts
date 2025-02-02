import axios from "./axiosConfig";
import { number, z } from "zod";

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
  next_cursor: z.string().nullable(),
});
export type ideaType = z.infer<typeof ideaSchema>;

export type ideaResponseType = z.infer<typeof ideasResponseSchema>;

export const fetchIdeas = async ({
  limit,
  cursorId,
  name,
  track,
}: {
  limit: number;
  cursorId?: string;
  name?: string;
  track?: string;
}) => {
  try {
    const params = new URLSearchParams({ limit: String(limit) });

    if (name) {
      params.append("name", name);
    } else if (cursorId) {
      params.append("cursor", cursorId);
    }
    const url = track !== ""? `admin/ideas/${track}?${params.toString()}` : `admin/ideas?${params.toString()}`;

    const response = await axios.get<ideaResponseType>(url);
    const parsedResponse = ideasResponseSchema.parse(response.data);
    console.log(parsedResponse.data);

    //send in next cursor when data is done
    const nextCursor = parsedResponse.next_cursor;

    return {
      idea: parsedResponse.data,
      nextCursor,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
