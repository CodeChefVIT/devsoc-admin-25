import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})
const userSchema = z.object({
  ID: z.string(),
  TeamID: z.string().nullable(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().email(),
  PhoneNo: z.string().nullable(),
  Gender: z.string(),
  RegNo: z.string().nullable(),
  GithubProfile: z.string().nullable(),
  Password: z.string(),
  Role: z.enum(["admin", "student"]),
  IsLeader: z.boolean(),
  IsVerified: z.boolean(),
  IsBanned: z.boolean(),
  IsProfileComplete: z.boolean(),
  IsStarred: z.boolean(),
  RoomNo: z.string().nullable(),
  HostelBlock: z.string().nullable(),
});

// Response schema
const usersResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    message: z.string(),
    users: z.array(userSchema),
  }),
});





export const teamSchema = z.object({
  ID: z.string(),
  Name: z.string(),
  NumberOfPeople: z.number(),
  RoundQualified: z.number(),
  Code: z.string(),
  IsBanned: z.boolean(),
});

const TeamsResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  data: z.object({
    message: z.string(),
    teams: z.array(teamSchema),
  }),
});


export type Task = z.infer<typeof taskSchema>
export type Team = z.infer<typeof teamSchema>
export type User = z.infer<typeof userSchema>;
export type TeamsResponse = z.infer<typeof TeamsResponseSchema>;
export type UserResponse = z.infer<typeof usersResponseSchema>;