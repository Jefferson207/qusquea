import "server-only";

import type { Category, Experience } from "@/lib/data";
import { categories as seedCategories, experiences as seedExperiences } from "@/lib/data";
import { redis, redisKeys } from "@/lib/redis";
import { siteConfig } from "@/lib/site";

export type StoredSiteConfig = typeof siteConfig;

export async function getExperiences() {
  try {
    const slugs = await redis.smembers<string[]>(redisKeys.experiencesIndex);
    if (!slugs.length) return seedExperiences;

    const rows = await redis.mget<Experience[]>(
      ...slugs.map((slug) => redisKeys.experience(slug)),
    );

    return rows.filter(Boolean).sort((a, b) => a.order - b.order);
  } catch {
    return seedExperiences;
  }
}

export async function getExperience(slug: string) {
  try {
    const row = await redis.get<Experience>(redisKeys.experience(slug));
    if (row) return row;
  } catch {}

  return seedExperiences.find((experience) => experience.slug === slug);
}

export async function saveExperience(experience: Experience) {
  await redis.set(redisKeys.experience(experience.slug), experience);
  await redis.sadd(redisKeys.experiencesIndex, experience.slug);
}

export async function deleteExperience(slug: string) {
  await redis.del(redisKeys.experience(slug));
  await redis.srem(redisKeys.experiencesIndex, slug);
}

export async function getCategories() {
  try {
    const slugs = await redis.smembers<string[]>(redisKeys.categoriesIndex);
    if (!slugs.length) return seedCategories;

    const rows = await redis.mget<Category[]>(
      ...slugs.map((slug) => redisKeys.category(slug)),
    );

    return rows.filter(Boolean);
  } catch {
    return seedCategories;
  }
}

export async function saveCategory(category: Category) {
  await redis.set(redisKeys.category(category.slug), category);
  await redis.sadd(redisKeys.categoriesIndex, category.slug);
}

export async function deleteCategory(slug: string) {
  await redis.del(redisKeys.category(slug));
  await redis.srem(redisKeys.categoriesIndex, slug);
}

export async function getSiteConfig() {
  try {
    return (await redis.get<StoredSiteConfig>(redisKeys.siteConfig)) ?? siteConfig;
  } catch {
    return siteConfig;
  }
}

export async function saveSiteConfig(config: StoredSiteConfig) {
  await redis.set(redisKeys.siteConfig, config);
}

export async function seedRedisIfEmpty() {
  const experienceSlugs = await redis.smembers<string[]>(redisKeys.experiencesIndex);
  if (!experienceSlugs.length) {
    await Promise.all(seedExperiences.map((experience) => saveExperience(experience)));
  }

  const categorySlugs = await redis.smembers<string[]>(redisKeys.categoriesIndex);
  if (!categorySlugs.length) {
    await Promise.all(seedCategories.map((category) => saveCategory(category)));
  }

  const config = await redis.get(redisKeys.siteConfig);
  if (!config) {
    await saveSiteConfig(siteConfig);
  }
}
