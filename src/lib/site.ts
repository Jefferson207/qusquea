export const siteConfig = {
  name: "Qusqueando Travel",
  whatsapp: "+51916788768",
  whatsappDisplay: "+51 916 788 768",
  email: "reservas@qusqueandotravel.com",
  address: "Cusco, Perú",
  heroTitle: "Explora el Perú desde su historia, sus estrellas y su cultura.",
  heroSubtitle:
    "Experiencias culturales, arqueoastronómicas y de naturaleza diseñadas para conectar con la cosmovisión andina.",
  heroImage:
    "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1800&auto=format&fit=crop",
  socials: {
    instagram: "https://instagram.com/qusqueandotravel",
    facebook: "https://facebook.com/qusqueandotravel",
  },
};

export function whatsappUrl(experienceName?: string) {
  const message = experienceName
    ? `Hola, quiero información sobre el paquete ${experienceName} de Qusqueando Travel.`
    : "Hola, quiero información sobre las experiencias de Qusqueando Travel.";

  return `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(
    message,
  )}`;
}
