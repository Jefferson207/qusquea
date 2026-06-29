import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { legalPages } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Medios de Pago",
  description: legalPages.payments.description,
};

export default function PaymentsPage() {
  return <LegalPage {...legalPages.payments} />;
}
