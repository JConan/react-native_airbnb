import { z } from "zod";

export const PhotoSchema = z.object({
  url: z.string().url(),
  picture_id: z.string(),
});

export const RoomsSchema = z.array(
  z.object({
    photos: z.array(PhotoSchema).optional(),
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number().nonnegative(),
    ratingValue: z.number().int().nonnegative(),
    location: z.tuple([z.number(), z.number()]),
    user: z.object({
      account: z.object({
        photo: PhotoSchema,
        userName: z.string(),
        description: z.string(),
      }),
      rooms: z.array(z.string()),
      _id: z.string(),
      email: z.string().email(),
      token: z.string(),
      salt: z.string(),
      hash: z.string(),
    }),
  })
);

export type Rooms = z.infer<typeof RoomsSchema>;
