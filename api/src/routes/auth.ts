import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { DUMMY_HASH, hashPassword, signToken, verifyPassword } from "../lib/auth.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import { loginBody, registerBody } from "../schemas/auth.js";

export const authRouter = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many attempts, please try again later" },
});

const publicUser = (user: { id: number; email: string; role: string }) => ({
  id: user.id,
  email: user.email,
  role: user.role,
});

authRouter.post("/register", limiter, validate(registerBody), async (_req, res) => {
  const { email, password } = res.locals.body;
  try {
    const user = await prisma.user.create({
      data: { email, passwordHash: await hashPassword(password) },
    });
    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ error: "Email already registered" });
    }
    throw error;
  }
});

authRouter.post("/login", limiter, validate(loginBody), async (_req, res) => {
  const { email, password } = res.locals.body;
  const user = await prisma.user.findUnique({ where: { email } });
  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.status(200).json({ token: signToken(user), user: publicUser(user) });
});

authRouter.get("/me", requireAuth, async (_req, res) => {
  const user = await prisma.user.findUnique({ where: { id: res.locals.user.id } });
  if (!user) {
    return res.status(401).json({ error: "Unknown user" });
  }
  res.status(200).json(publicUser(user));
});
