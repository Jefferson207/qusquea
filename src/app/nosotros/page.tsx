import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Historia, misión y visión de Qusqueando Travel.",
};

export default function AboutPage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8872d]">Nosotros</p>
          <h1 className="mt-3 text-4xl font-bold text-[#101828] sm:text-5xl">
            Turismo cultural con mirada andina y servicio premium.
          </h1>
          <div className="mt-8 grid gap-8 text-[#475467]">
            <section>
              <h2 className="text-xl font-bold text-[#101828]">Historia</h2>
              <p className="mt-3 leading-7">
                Qusqueando Travel nació con el propósito de acercar a viajeros nacionales y extranjeros a la cosmovisión andina mediante experiencias que integran conocimiento ancestral, observación del cielo y exploración de sitios arqueológicos.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-[#101828]">Misión</h2>
              <p className="mt-3 leading-7">
                Ofrecer experiencias auténticas que conecten a las personas con la cultura andina, el patrimonio arqueológico y la observación de fenómenos astronómicos, promoviendo un turismo responsable y de calidad.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-[#101828]">Visión</h2>
              <p className="mt-3 leading-7">
                Ser una agencia líder en turismo arqueoastronómico en el Perú.
              </p>
            </section>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1400&auto=format&fit=crop"
            alt="Paisaje arqueológico andino"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
