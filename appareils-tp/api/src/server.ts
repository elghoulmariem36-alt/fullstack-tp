import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.js";

const port = Number(process.env.PORT ?? 3001);

try {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("MongoDB connection successful!");
  app.listen(port, () => console.log(`Server listening on port ${port}...`));
} catch (error) {
  console.error("MongoDB connection failed!", error);
  process.exit(1);
}
