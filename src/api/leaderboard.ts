import { type UserResponse } from "@/data/schema";
import { usersResponseSchema } from "@/data/schema";
import axios from "./axiosConfig";
import { z } from "zod";
export const leaderboardSchema = z.object({
  ID: z.string(),
  team_id: z.string(),
  team_name: z.string(),
  design: z.number(),
  implementation: z.number(),
  presentation: z.number(),
  innovation: z.number(),
  teamwork: z.number(),
  comment: z.string(),
  total_score: z.number(),
});

export type Leaderboard = z.infer<typeof leaderboardSchema>;

export const leaderBoardResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    message: z.string().optional(),
    users: z.array(leaderboardSchema).nullable(),
  }),
});
export type LeaderboardResponse = z.infer<typeof leaderBoardResponseSchema>;

export const fetchLeaderboard = async ({
  limit,
  cursorId,
  name,
}: {
  limit: number;
  cursorId?: string;
  name?: string;
}) => {
  try {
    const params = new URLSearchParams({ limit: String(limit) });

    if (name) {
      params.append("name", name);
    } else if (cursorId) {
      params.append("cursor", cursorId);
    }

    const url = `admin/users?${params.toString()}`;

    const response = await axios.get<LeaderboardResponse>(url);

    const parsedResponse = leaderBoardResponseSchema.parse(response.data);
    const users = parsedResponse.data.users;
    console.log(users);
    const nextCursor = users != null ? users[users.length - 1]?.ID : null;

    return {
      users,
      nextCursor,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
