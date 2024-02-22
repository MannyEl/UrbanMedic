import { z } from "zod";

export const loginFormSchema = z
  .string()
  .min(1)
  .regex(/^[a-zA-Z]+$/);
