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
  const height = useTransform(scrollY, [0, 120], [74, 62]);
  const shadow = useTransform(
    scrollY,
    [0, 120],
    ["0 1px 0 rgba(255,255,255,0.60)", "0 14px 34px rgba(16,24,40,0.08)"],
  );

  return (
    <motion.header
      style={{ height, boxShadow: shadow }}
      className="sticky top-0 z-50 border-b border-white/55 bg-white/82 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#101828] text-[#d6a84f] shadow-[0_10px_26px_rgba(16,24,40,0.16)] transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
            <Compass className="h-4.5 w-4.5" />
          </span>
          <span className="text-base font-bold tracking-[-0.01em] text-[#101828] sm:text-lg">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group/link relative py-2 text-sm font-semibold text-[#475467] transition duration-300 hover:text-[#101828]"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-[#d6a84f] transition-transform duration-300 group-hover/link:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            className={buttonClassName("primary", "hidden h-10 px-6 sm:inline-flex")}
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
