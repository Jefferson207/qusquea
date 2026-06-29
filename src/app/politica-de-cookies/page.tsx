import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { legalPages } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: legalPages.cookies.description,
};

export default function CookiesPage() {
  return <LegalPage {...legalPages.cookies} />;
}
