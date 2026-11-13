import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { productsRouter } from "./routes/products.js";
import { categoriesRouter } from "./routes/categories.js";
import { authRouter } from "./routes/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const app = express();

// Behind the Nginx gateway, trust the first proxy so rate limiting sees the real client IP
if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:4200,http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(morgan("dev"));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use(errorHandler);
