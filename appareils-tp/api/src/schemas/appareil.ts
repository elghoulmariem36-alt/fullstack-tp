import { z } from "zod";
import mongoose from "mongoose";

const objectId = z.string().refine((v) => mongoose.isValidObjectId(v), "Invalid id");

export const appareilBody = z.object({
  name: z.string().trim().min(1),
  status: z.enum(["On", "Off"]),
  room: objectId.nullable().optional(),
});

export const roomBody = z.object({
  name: z.string().trim().min(1),
});

export const switchBody = appareilBody.pick({ status: true });

export const listQuery = z.object({
  status: z.enum(["On", "Off"]).optional(),
});

export const idParam = z.object({ id: objectId });
