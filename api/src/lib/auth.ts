import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";

export function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and contain at least 32 characters");
  }
  return secret;
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const verifyPassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

// Compared when the email is unknown, so response times do not reveal which emails exist
export const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

export function signToken(user: { id: number; role: string }): string {
  return jwt.sign({ role: user.role }, getSecret(), {
    algorithm: "HS256",
    subject: String(user.id),
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "1h") as SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): { id: number; role: string } {
  const payload = jwt.verify(token, getSecret(), { algorithms: ["HS256"] });
  if (typeof payload === "string" || !payload.sub) {
    throw new Error("Invalid token");
  }
  return { id: Number(payload.sub), role: String(payload.role) };
}
