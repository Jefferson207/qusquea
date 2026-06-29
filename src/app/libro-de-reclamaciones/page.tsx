import type { Metadata } from "next";
import { BookOpen, FileText, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Formulario virtual del Libro de Reclamaciones de Qusqueando Travel.",
};

export default function ClaimsBookPage() {
  return (
    <section className="bg-[#f6f3ed] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg border border-[#e4e7ec] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8872d]">
                Legal y seguridad
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#101828] sm:text-4xl">
                Libro de Reclamaciones
              </h1>
              <p className="mt-3 text-[#667085]">
                Registra una queja o reclamo relacionado con los servicios de {siteConfig.name}.
              </p>
            </div>
            <BookOpen className="h-12 w-12 text-[#b8872d]" />
          </div>
        </div>

        <form className="grid gap-8">
          <ClaimsSection
            icon={<FileText className="h-5 w-5" />}
            title="1. Identificación del proveedor"
            description="Datos de la empresa que atiende la comunicación."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <ReadOnlyField label="Razón comercial" value={siteConfig.name} />
              <ReadOnlyField label="Correo electrónico" value={siteConfig.email} />
              <ReadOnlyField label="Teléfono" value={siteConfig.whatsappDisplay} />
              <ReadOnlyField label="Dirección" value={siteConfig.address} />
            </div>
          </ClaimsSection>

          <ClaimsSection
            icon={<UserRound className="h-5 w-5" />}
            title="2. Datos del reclamo"
            description="Completa los datos del consumidor que presenta la comunicación."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Fecha y hora del incidente">
                <input type="datetime-local" className="field rounded-xl" />
              </Field>
              <Field label="Nombre completo del consumidor">
                <input placeholder="Nombres y apellidos" className="field rounded-xl" />
              </Field>
              <Field label="Tipo de documento">
                <select className="field rounded-xl">
                  <option>Seleccionar</option>
                  <option>DNI</option>
                  <option>Carné de extranjería</option>
                  <option>Pasaporte</option>
                </select>
              </Field>
              <Field label="Número de documento">
                <input placeholder="Número de documento" className="field rounded-xl" />
              </Field>
              <Field label="Domicilio fiscal o dirección">
                <input placeholder="Dirección del consumidor" className="field rounded-xl" />
              </Field>
              <Field label="Correo electrónico">
                <input type="email" placeholder="correo@dominio.com" className="field rounded-xl" />
              </Field>
              <Field label="Celular">
                <input placeholder="+51 999 999 999" className="field rounded-xl" />
              </Field>
            </div>
          </ClaimsSection>

          <ClaimsSection
            icon={<FileText className="h-5 w-5" />}
            title="3. Detalle del reclamo"
            description="Indica el servicio contratado y describe lo ocurrido."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Tipo de comunicación">
                <select className="field rounded-xl">
                  <option>Reclamo</option>
                  <option>Queja</option>
                </select>
              </Field>
              <Field label="Servicio contratado">
                <input placeholder="Nombre de la experiencia o paquete" className="field rounded-xl" />
              </Field>
              <Field label="Monto reclamado">
                <input placeholder="S/ o USD" className="field rounded-xl" />
              </Field>
              <Field label="Pedido del consumidor">
                <input placeholder="Solución solicitada" className="field rounded-xl" />
              </Field>
              <Field label="Descripción" wide>
                <textarea rows={6} placeholder="Describe los hechos de forma clara" className="field rounded-xl" />
              </Field>
            </div>
          </ClaimsSection>

          <div className="rounded-lg border border-[#e4e7ec] bg-white p-6 shadow-sm">
            <label className="flex items-start gap-3 text-sm leading-6 text-[#475467]">
              <input type="checkbox" className="mt-1" />
              Declaro que la información consignada es verdadera y autorizo el uso de mis
              datos para la atención de esta comunicación.
            </label>
            <Button type="button" className="mt-6 w-full sm:w-auto">
              Enviar reclamo
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ClaimsSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-[#dedbd2] bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#fff6df] text-[#b8872d]">
          {icon}
        </span>
        <div>
          <h2 className="font-serif text-2xl font-bold text-black">{title}</h2>
          <p className="mt-2 text-sm text-black">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "grid gap-2 md:col-span-2" : "grid gap-2"}>
      <span className="text-sm font-bold text-black">{label}</span>
      {children}
    </label>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-bold text-black">{label}</span>
      <div className="min-h-12 rounded-xl border border-[#d0d5dd] bg-[#f9fafb] px-4 py-3 text-sm font-medium text-[#475467]">
        {value}
      </div>
    </div>
  );
}
