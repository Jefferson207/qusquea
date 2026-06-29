import { PrismaClient } from "@prisma/client";
import { categories, experiences } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      name: "Qusqueando Travel",
      whatsapp: "+51 916 788 768",
      email: "reservas@qusqueandotravel.com",
      address: "Cusco, Perú",
      socials: {
        instagram: "https://instagram.com/qusqueandotravel",
        facebook: "https://facebook.com/qusqueandotravel",
      },
      heroText: "Explora el Perú desde su historia, sus estrellas y su cultura.",
      heroImage: experiences[0].mainImage,
    },
  });

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: { name: category.name, slug: category.slug },
    });
  }

  for (const experience of experiences) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: categories.find((item) => item.name === experience.category)?.slug },
    });

    await prisma.experience.upsert({
      where: { slug: experience.slug },
      update: {},
      create: {
        name: experience.name,
        slug: experience.slug,
        categoryId: category.id,
        shortDescription: experience.shortDescription,
        fullDescription: experience.fullDescription,
        duration: experience.duration,
        location: experience.location,
        difficulty: experience.difficulty,
        modality: experience.modality,
        priceFrom: experience.priceFrom,
        currency: experience.currency,
        includes: experience.includes,
        excludes: experience.excludes,
        itinerary: experience.itinerary,
        faqs: experience.faqs,
        status: experience.status,
        featured: experience.featured,
        order: experience.order,
        seoTitle: experience.seoTitle,
        seoDescription: experience.seoDescription,
        mainImage: experience.mainImage,
        gallery: {
          create: experience.gallery.map((url, index) => ({
            url,
            alt: experience.name,
            order: index,
          })),
        },
      },
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
