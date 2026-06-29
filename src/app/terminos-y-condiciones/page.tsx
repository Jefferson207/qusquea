import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { legalPages } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: legalPages.terms.description,
};

export default function TermsPage() {
  return <LegalPage {...legalPages.terms} />;
}
