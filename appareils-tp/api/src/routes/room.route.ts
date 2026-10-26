import { Router } from "express";
import { Room } from "../models/room.model.js";
import { Appareil } from "../models/appareil.model.js";
import { validate } from "../middlewares/validate.js";
import { idParam, roomBody } from "../schemas/appareil.js";

export const roomRouter = Router();

roomRouter.get("/", async (_req, res) => {
  res.status(200).json(await Room.find().sort({ name: 1 }));
});

roomRouter.post("/", validate(roomBody), async (_req, res) => {
  const room = await Room.create(res.locals.body);
  res.status(201).json(room);
});

roomRouter.delete("/:id", validate(idParam, "params"), async (_req, res) => {
  const result = await Room.deleteOne({ _id: res.locals.params.id });
  if (result.deletedCount === 0) return res.status(404).json({ error: "Room not found" });
  await Appareil.updateMany({ room: res.locals.params.id }, { room: null });
  res.status(204).end();
});
