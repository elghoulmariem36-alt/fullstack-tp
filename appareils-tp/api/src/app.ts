import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { appareilRouter } from "./routes/appareil.route.js";
import { roomRouter } from "./routes/room.route.js";

export const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/appareils", appareilRouter);
app.use("/api/rooms", roomRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (typeof err === "object" && err !== null && "code" in err && err.code === 11000) {
    return res.status(409).json({ error: "Already exists" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
