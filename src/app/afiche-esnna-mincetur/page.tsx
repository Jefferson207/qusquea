import type { Metadata } from "next";
import Image from "next/image";
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
          <div className="overflow-hidden rounded-[24px] border border-[#e4e7ec] bg-white p-3 shadow-[0_18px_54px_rgba(16,24,40,0.10)]">
            <Image
              src="/esnna.png"
              alt="Afiche ESNNA MINCETUR"
              width={1200}
              height={1600}
              className="h-auto w-full rounded-[18px]"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
