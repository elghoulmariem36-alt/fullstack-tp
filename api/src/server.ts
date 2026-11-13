import "dotenv/config";
import { app } from "./app.js";
import { getSecret, hashPassword } from "./lib/auth.js";
import { prisma } from "./lib/prisma.js";

// Fail fast if the signing secret is missing or too short
getSecret();

async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  await prisma.user.create({
    data: { email, passwordHash: await hashPassword(password), role: "ADMIN" },
  });
  console.log(`Admin account created for ${email}`);
}

const port = Number(process.env.PORT ?? 4000);

await ensureAdmin();
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
