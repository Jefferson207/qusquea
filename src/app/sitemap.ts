import type { MetadataRoute } from "next";
import { getExperiences } from "@/lib/store";

const baseUrl = "https://qusqueandotravel.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const experiences = await getExperiences();

  return [
    "",
    "/nosotros",
    "/experiencias",
    "/contacto",
    "/politica-de-privacidad",
    "/politica-de-proteccion-de-datos-personales",
    "/terminos-y-condiciones",
    "/medios-de-pago",
    "/politica-de-cookies",
    "/afiche-esnna-mincetur",
    "/libro-de-reclamaciones",
    ...experiences.map((experience) => `/experiencias/${experience.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
