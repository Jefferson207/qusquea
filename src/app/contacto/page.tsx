import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { siteConfig, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Qusqueando Travel por WhatsApp, correo o formulario.",
};

export default function ContactPage() {
  return (
    <section className="bg-[#f6f7f9] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8872d]">Contacto</p>
          <h1 className="mt-3 text-4xl font-bold text-[#101828] sm:text-5xl">
            Planifiquemos tu próxima experiencia en Perú.
          </h1>
          <div className="mt-8 grid gap-4 text-[#475467]">
            <a href={whatsappUrl()} className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#b8872d]" /> {siteConfig.whatsappDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#b8872d]" /> {siteConfig.email}
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#b8872d]" /> {siteConfig.address}
            </span>
          </div>
          <div className="mt-8 overflow-hidden rounded-lg border border-[#e4e7ec] bg-white">
            <iframe
              title="Mapa de Cusco"
              src="https://www.google.com/maps?q=Cusco%2C%20Peru&output=embed"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>
        <form className="rounded-lg border border-[#e4e7ec] bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            {["Nombre", "Correo", "Teléfono"].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-medium text-[#344054]">
                {label}
                <input className="h-11 rounded-md border border-[#d0d5dd] px-4 outline-none focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20" />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-medium text-[#344054]">
              Mensaje
              <textarea rows={6} className="rounded-md border border-[#d0d5dd] px-4 py-3 outline-none focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20" />
            </label>
            <a href={whatsappUrl()} className={buttonClassName("primary", "w-full")}>
              Enviar por WhatsApp
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
