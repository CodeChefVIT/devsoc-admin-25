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
export const userSchema = z.object({
  ID: z.string(),
  TeamID: z.string().nullable(),
  FirstName: z.string().nullable(), // Ensuring non-empty or null
  LastName: z.string().nullable(),
  Email: z.string().email(),
  PhoneNo: z.string().nullable(),
  Gender: z.string().nullable(), // Explicit gender validation
  RegNo: z.string().nullable(),
  GithubProfile: z.string().url().nullable(), // Ensures valid URL
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
export const usersResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    message: z.string().optional(),
    users: z.array(userSchema).nullable(),
  }),
});





export const teamSchema = z.object({
  ID: z.string().nullable(),
  Name: z.string().nullable(),
  NumberOfPeople: z.number(),
  RoundQualified: z.number(),
  Code: z.string().nullable(),
  IsBanned: z.boolean(),
});

export const TeamsResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  data: z.object({
    message: z.string().optional(),
    teams: z.array(teamSchema),
  }),
});


export const TeamResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  data: z.object({
    message: z.string(),
    team: z.array(teamSchema),
  }),
});

export const TeamFromSearchSchema = z.object({
  FirstName: z.string(),
  LastName: z.string(),
  GithubProfile: z.string(),
  VitEmail: z.string(),
  RegNo: z.string(),
  PhoneNo: z.string()
})
export const TeamsFromSearchSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  data: z.object({
    message: z.string(),
    team: z.array(TeamFromSearchSchema),
  }),
})



export type Task = z.infer<typeof taskSchema>
export type Team = z.infer<typeof teamSchema>
export type User = z.infer<typeof userSchema>;
export type UserResponse = z.infer<typeof usersResponseSchema>;
export type TeamResponse = z.infer<typeof TeamResponseSchema>; //for searching by id
export type TeamsResponse = z.infer<typeof TeamsResponseSchema>; //for fetching all the teams
export type TeamFromSearch = z.infer<typeof TeamFromSearchSchema>;
export type TeamsFromSearch = z.infer<typeof TeamsFromSearchSchema>;