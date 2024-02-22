import { z } from "zod";

export const userFormSchema = z.object({
  name: z.object({
    first: z
      .string()
      .trim()
      .min(1)
      .max(25)
      .regex(/^[\u0400-\u04FF\s-]+$/),
    last: z
      .string()
      .trim()
      .min(1)
      .max(25)
      .regex(/^[\u0400-\u04FF\s-]+$/),
  }),
  email: z.string().email(),
  gender: z.enum(["male", "female"]),
});
