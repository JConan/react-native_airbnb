import { z } from "zod";

export const UserInfoSchema = z.object({
  description: z.string(),
  email: z.string().email(),
  id: z.string(),
  photo: z
    .object({
      picture_id: z.string(),
      url: z.string().url(),
    })
    .optional(),
  rooms: z.array(z.string()),
  token: z.string(),
  username: z.string(),
});

export const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type UserSignInForms = z.infer<typeof UserSignInSchema>;
export type UserInfo = z.infer<typeof UserInfoSchema>;
