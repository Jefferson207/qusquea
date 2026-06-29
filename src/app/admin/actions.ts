"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createAdminSession, destroyAdminSession, requireAdmin } from "@/lib/admin-auth";
import type { Experience } from "@/lib/data";
import { categories as seedCategories } from "@/lib/data";
import {
  deleteCategory,
  deleteExperience,
  getExperience,
  getSiteConfig,
  saveCategory,
  saveExperience,
  saveSiteConfig,
  seedRedisIfEmpty,
} from "@/lib/store";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function loginAdmin(formData: FormData) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/login?error=1");

  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  if (
    parsed.data.username !== expectedUser ||
    parsed.data.password !== expectedPassword
  ) {
    redirect("/admin/login?error=1");
  }

  await seedRedisIfEmpty();
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await destroyAdminSession();
  redirect("/admin/login");
}

const experienceSchema = z.object({
  originalSlug: z.string().optional(),
  mainImage: z.string().url(),
  gallery: z.string(),
  name: z.string().min(3),
  category: z.string().min(1),
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(20),
  duration: z.string().min(1),
  location: z.string().min(1),
  difficulty: z.string().min(1),
  modality: z.string().min(1),
  priceFrom: z.coerce.number().min(0),
  currency: z.string().min(3),
  includes: z.string(),
  excludes: z.string(),
  itinerary: z.string(),
  faqs: z.string(),
  status: z.enum(["ACTIVE", "DRAFT"]),
  featured: z.coerce.boolean().default(false),
  order: z.coerce.number(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export async function upsertExperience(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData);
  const parsed = experienceSchema.parse({
    ...raw,
    featured: formData.get("featured") === "on",
  });
  const slug = slugify(parsed.name);

  if (parsed.originalSlug && parsed.originalSlug !== slug) {
    await deleteExperience(parsed.originalSlug);
  }

  const previous = parsed.originalSlug ? await getExperience(parsed.originalSlug) : undefined;
  const experience: Experience = {
    id: previous?.id ?? slug,
    name: parsed.name,
    slug,
    category: parsed.category,
    shortDescription: parsed.shortDescription,
    fullDescription: parsed.fullDescription,
    duration: parsed.duration,
    location: parsed.location,
    difficulty: parsed.difficulty,
    modality: parsed.modality,
    priceFrom: parsed.priceFrom,
    currency: parsed.currency,
    mainImage: parsed.mainImage,
    gallery: parsed.gallery.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean),
    includes: parsed.includes.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    excludes: parsed.excludes.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    itinerary: parsed.itinerary
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, ...rest] = line.split(":");
        return { title: title.trim(), description: rest.join(":").trim() || title.trim() };
      }),
    faqs: parsed.faqs
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [question, ...rest] = line.split("?");
        return {
          question: `${question.trim()}?`,
          answer: rest.join("?").replace(/^[:\s]+/, "").trim() || "Por confirmar.",
        };
      }),
    status: parsed.status,
    featured: parsed.featured,
    order: parsed.order,
    seoTitle: parsed.seoTitle || `${parsed.name} | Qusqueando Travel`,
    seoDescription:
      parsed.seoDescription ||
      `Reserva ${parsed.name} con Qusqueando Travel y descubre Perú.`,
  };

  if (!experience.gallery.length) {
    experience.gallery = [experience.mainImage];
  }

  await saveExperience(experience);
  revalidatePath("/");
  revalidatePath("/experiencias");
  revalidatePath(`/experiencias/${slug}`);
  redirect("/admin/experiencias");
}

export async function removeExperience(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  if (slug) await deleteExperience(slug);
  revalidatePath("/");
  revalidatePath("/experiencias");
}

export async function upsertCategory(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const slug = slugify(name);
  await saveCategory({ id: slug, name, slug });
  revalidatePath("/experiencias");
  revalidatePath("/admin/categorias");
}

export async function removeCategory(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  if (slug && !seedCategories.some((category) => category.slug === slug)) {
    await deleteCategory(slug);
  }
  revalidatePath("/admin/categorias");
}

export async function updateSiteConfig(formData: FormData) {
  await requireAdmin();
  const current = await getSiteConfig();
  await saveSiteConfig({
    ...siteConfig,
    ...current,
    name: String(formData.get("name") ?? current.name),
    whatsappDisplay: String(formData.get("whatsappDisplay") ?? current.whatsappDisplay),
    whatsapp: String(formData.get("whatsapp") ?? current.whatsapp),
    email: String(formData.get("email") ?? current.email),
    address: String(formData.get("address") ?? current.address),
    heroTitle: String(formData.get("heroTitle") ?? current.heroTitle),
    heroSubtitle: String(formData.get("heroSubtitle") ?? current.heroSubtitle),
    heroImage: String(formData.get("heroImage") ?? current.heroImage),
  });
  revalidatePath("/");
  revalidatePath("/admin/configuracion");
}
