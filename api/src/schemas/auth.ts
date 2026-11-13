import { z } from "zod";

const email = z
  .email()
  .max(254)
  .transform((value) => value.toLowerCase());

export const registerBody = z.object({
  email,
  password: z.string().min(8, "8 characters minimum").max(72),
});

export const loginBody = z.object({
  email,
  password: z.string().min(1).max(72),
});
