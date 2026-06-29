import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { LegalPage } from "@/components/legal/legal-page";
import { legalPages } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Afiche ESNNA MINCETUR",
  description: legalPages.esnna.description,
};

export default function EsnnaPage() {
  return (
    <>
      <LegalPage {...legalPages.esnna} />
      <section className="-mt-12 bg-[#f6f7f9] pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-[#d6a84f]/40 bg-[#101828] p-6 text-white shadow-sm sm:p-8">
            <ShieldCheck className="h-9 w-9 text-[#d6a84f]" />
            <h2 className="mt-4 text-2xl font-bold">Turismo responsable y seguro</h2>
            <p className="mt-3 leading-7 text-[#d0d5dd]">
              En cumplimiento del enfoque preventivo del sector turismo, esta empresa
              rechaza la explotación sexual de niñas, niños y adolescentes y promueve
              experiencias respetuosas con las comunidades anfitrionas.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
