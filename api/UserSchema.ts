import { z } from "zod";

export const UserInfoSchema = z.object({
  description: z.string(),
  email: z.string().email(),
  id: z.string(),
  photo: z
    .union([
      z.object({
        picture_id: z.string(),
        url: z.string().url(),
      }),
      z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          type: z.string(),
          url: z.string().url(),
        })
      ),
    ])
    .optional(),
  rooms: z.array(z.string()),
  token: z.string().optional(),
  username: z.string(),
});

export const UserSignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const UserSignUpFormSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(1),
    description: z.string().min(1),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"],
  });

export const UserUpdateFormSchema = z.object({
  email: z.string().email(),
  description: z.string().min(1),
  username: z.string().min(1),
});

export type UserSignInForms = z.infer<typeof UserSignInFormSchema>;
export type UserSignUpForm = z.infer<typeof UserSignUpFormSchema>;
export type UserInfo = z.infer<typeof UserInfoSchema>;
export type UserUpdateForm = z.infer<typeof UserUpdateFormSchema>;
