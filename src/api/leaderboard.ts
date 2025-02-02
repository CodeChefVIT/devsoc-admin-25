import { z } from "zod";
import axios from "./axiosConfig";
export const scoreSchema = z.object({
  team_name: z.string(),
  design: z.number(),
  implementation: z.number(),
  presentation: z.number(),
  innovation: z.number(),
  teamwork: z.number(),
  comment: z.string(),
  total_score: z.number(),
});
export const leaderboardUserSchema = z.object({
  ID: z.string(),
  team_id: z.string(),
  team_name: z.string(),
  rounds: z.array(scoreSchema),
  overall_total: z.number(),
});

export type Leaderboard = z.infer<typeof leaderboardUserSchema>;

export const leaderBoardResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    users: z.array(leaderboardUserSchema).nullable(),
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
