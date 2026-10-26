import mongoose from "mongoose";

const appareilSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    status: { type: String, enum: ["On", "Off"], required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
  },
  { timestamps: true }
);

export const Appareil = mongoose.model("Appareil", appareilSchema);
