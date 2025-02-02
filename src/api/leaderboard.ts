import { z } from "zod";
import axios from "./axiosConfig";
export const scoreSchema = z.object({
  round: z.number(),
  design: z.number(),
  implementation: z.number(),
  presentation: z.number(),
  innovation: z.number(),
  teamwork: z.number(), // Change from string to number
  round_total: z.number(),
});

// Define the schema for a leaderboard user/team
export const leaderboardUserSchema = z.object({
  team_id: z.string(),
  team_name: z.string(),
  rounds: z.array(scoreSchema),
  overall_total: z.number(),
});

// Define the schema for the whole response
export const leaderboardResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    leaderboard: z.array(leaderboardUserSchema), // Array of teams
    next_cursor: z.string().nullable(),
  }),
});
export type Leaderboard = z.infer<typeof leaderboardUserSchema> ;

// Type inference for the leaderboard response
export type LeaderboardResponse = z.infer<typeof leaderboardResponseSchema>;
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

    const url = `admin/leaderboard?${params.toString()}`;

    const response = await axios.get<LeaderboardResponse>(url);

    const parsedResponse = leaderboardResponseSchema.parse(response.data);
    const users = parsedResponse.data.leaderboard;
    console.log(users);
    const nextCursor = parsedResponse.data.next_cursor;

    return {
      users,
      nextCursor,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
