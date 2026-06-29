import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { legalPages } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: legalPages.privacy.description,
};

export default function PrivacyPage() {
  return <LegalPage {...legalPages.privacy} />;
}
