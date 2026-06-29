import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { legalPages } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Protección de Datos Personales",
  description: legalPages.personalData.description,
};

export default function PersonalDataPage() {
  return <LegalPage {...legalPages.personalData} />;
}
