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
export const userScheme = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  team_id: z.number().nullable(),
  is_vitian: z.boolean(),
  reg_no: z.string(),
  password: z.string(),
  phone_no: z.string(),
  role: z.string(),
  is_leader: z.boolean(),
  college: z.string(),
  is_verified: z.boolean(),
  is_banned: z.boolean(),
});



export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  number_of_people: z.number(),
  round_qualified: z.number(),
  code: z.string(),
});


export type Task = z.infer<typeof taskSchema>
export type Team = z.infer<typeof teamSchema>
export type User = z.infer<typeof userScheme>;
