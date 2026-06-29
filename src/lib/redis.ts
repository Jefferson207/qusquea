import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
});

export const redisKeys = {
  experiencesIndex: "qt:experiences:index",
  experience: (slug: string) => `qt:experience:${slug}`,
  categoriesIndex: "qt:categories:index",
  category: (slug: string) => `qt:category:${slug}`,
  siteConfig: "qt:site-config",
  adminSession: (token: string) => `qt:admin-session:${token}`,
};
