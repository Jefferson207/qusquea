import { updateSiteConfig } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";
import { getSiteConfig } from "@/lib/store";

export default async function AdminConfigPage() {
  await requireAdmin();
  const config = await getSiteConfig();

  return (
    <AdminShell>
      <section>
      <h1 className="text-3xl font-bold text-[#101828]">Configuración</h1>
      <form action={updateSiteConfig} className="mt-6 grid gap-5 rounded-[24px] border border-[#e4e7ec] bg-white p-6 shadow-sm">
        <Field label="Nombre empresa" name="name" value={config.name} />
        <Field label="WhatsApp visible" name="whatsappDisplay" value={config.whatsappDisplay} />
        <Field label="WhatsApp técnico" name="whatsapp" value={config.whatsapp} />
        <Field label="Correo" name="email" value={config.email} />
        <Field label="Dirección" name="address" value={config.address} />
        <Field label="Texto Hero" name="heroTitle" value={config.heroTitle} />
        <Field label="Subtítulo Hero" name="heroSubtitle" value={config.heroSubtitle} />
        <Field label="Imagen Hero" name="heroImage" value={config.heroImage} />
        <button className="h-11 w-fit rounded-full bg-[#101828] px-6 text-sm font-semibold text-white">
          Guardar configuración
        </button>
      </form>
      </section>
    </AdminShell>
  );
}

function Field({ label, name, value }: { label: string; name: string; value: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#344054]">
      {label}
      <input name={name} defaultValue={value} className="field" />
    </label>
  );
}
