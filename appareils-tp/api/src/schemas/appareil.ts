import { z } from "zod";
import mongoose from "mongoose";

export const appareilBody = z.object({
  name: z.string().trim().min(1),
  status: z.enum(["On", "Off"]),
});

export const switchBody = appareilBody.pick({ status: true });

export const idParam = z.object({
  id: z.string().refine((v) => mongoose.isValidObjectId(v), "Invalid id"),
});
