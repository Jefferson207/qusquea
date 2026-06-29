"use client";

import Link from "next/link";
import { Compass, Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig, whatsappUrl } from "@/lib/site";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/experiencias", label: "Experiencias" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 120], [78, 64]);
  const shadow = useTransform(
    scrollY,
    [0, 120],
    ["0 1px 0 rgba(255,255,255,0.7)", "0 18px 42px rgba(16,24,40,0.10)"],
  );

  return (
    <motion.header
      style={{ height, boxShadow: shadow }}
      className="sticky top-0 z-50 border-b border-white/50 bg-white/78 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#101828] text-[#d6a84f] shadow-[0_14px_34px_rgba(16,24,40,0.18)] transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
            <Compass className="h-5 w-5" />
          </span>
          <span className="text-base font-bold text-[#101828] sm:text-lg">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/55 p-1 shadow-[0_10px_28px_rgba(16,24,40,0.05)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-[#475467] transition duration-300 hover:bg-white hover:text-[#101828] hover:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            className={buttonClassName("primary", "hidden h-10 px-5 sm:inline-flex")}
          >
            Reservar ahora
          </a>
          <button
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e4e7ec] bg-white/80 shadow-sm transition hover:scale-105 hover:bg-white md:hidden",
            )}
            aria-label="Abrir navegación"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
