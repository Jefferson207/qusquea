import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import { redis, redisKeys } from "@/lib/redis";

export const adminCookieName = "qt_admin_session";

export async function createAdminSession() {
  const token = randomBytes(32).toString("hex");
  await redis.set(redisKeys.adminSession(token), { createdAt: Date.now() }, { ex: 60 * 60 * 8 });

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;
  if (token) {
    await redis.del(redisKeys.adminSession(token));
  }
  cookieStore.delete(adminCookieName);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;
  if (!token) return false;

  try {
    return Boolean(await redis.get(redisKeys.adminSession(token)));
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
