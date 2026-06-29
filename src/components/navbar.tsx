"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Compass, Menu, X } from "lucide-react";
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 120], [74, 62]);
  const shadow = useTransform(
    scrollY,
    [0, 120],
    ["0 1px 0 rgba(255,255,255,0.60)", "0 14px 34px rgba(16,24,40,0.08)"],
  );

  return (
    <motion.header
      style={{ boxShadow: shadow }}
      className="sticky top-0 z-50 border-b border-white/55 bg-white/90 backdrop-blur-xl"
    >
      <motion.div
        style={{ height }}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#101828] text-[#d6a84f] shadow-[0_10px_26px_rgba(16,24,40,0.16)] transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
            <Compass className="h-5 w-5" />
          </span>
          <span className="truncate text-base font-bold tracking-[-0.01em] text-[#101828] sm:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group/link relative py-2 text-sm font-semibold transition duration-300 hover:text-[#101828]",
                  active ? "text-[#101828]" : "text-[#475467]",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-[#d6a84f] transition-transform duration-300 group-hover/link:scale-x-100",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className={buttonClassName("primary", "hidden h-10 px-6 sm:inline-flex")}
          >
            Reservar ahora
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e4e7ec] bg-white/90 shadow-sm transition hover:scale-105 hover:bg-white md:hidden"
            aria-label={isOpen ? "Cerrar navegación" : "Abrir navegación"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-[#eaecf0] bg-white px-4 py-4 shadow-[0_18px_40px_rgba(16,24,40,0.10)] md:hidden"
          aria-label="Navegación móvil"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-semibold transition",
                  pathname === item.href
                    ? "bg-[#fff6df] text-[#8a621e]"
                    : "text-[#344054] hover:bg-[#f6f7f9] hover:text-[#101828]",
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("primary", "mt-2 w-full")}
              onClick={() => setIsOpen(false)}
            >
              Reservar ahora
            </a>
          </div>
        </nav>
      ) : null}
    </motion.header>
  );
}
