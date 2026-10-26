import express from "express";
import cors from "cors";
import morgan from "morgan";
import { appareilRouter } from "./routes/appareil.route.js";

export const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/appareils", appareilRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
