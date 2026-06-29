import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { ExperienceForm } from "@/components/admin/experience-form";
import { removeExperience } from "@/app/admin/actions";
import { buttonClassName } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { getCategories, getExperiences } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default async function AdminExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  await requireAdmin();
  const [{ edit }, experiences, categories] = await Promise.all([
    searchParams,
    getExperiences(),
    getCategories(),
  ]);
  const editing = edit ? experiences.find((experience) => experience.slug === edit) : undefined;

  return (
    <AdminShell>
      <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#101828]">Experiencias</h1>
          <p className="mt-2 text-[#667085]">CRUD central para tours, paquetes, privados y personalizados.</p>
        </div>
        <Link href="/experiencias" className={buttonClassName("outline")}>Ver catálogo</Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-[24px] border border-[#e4e7ec] bg-white shadow-sm">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-[#f9fafb] text-[#667085]">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Destacado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e7ec]">
            {experiences.map((experience) => (
              <tr key={experience.id}>
                <td className="px-4 py-3 font-medium text-[#101828]">{experience.name}</td>
                <td className="px-4 py-3 text-[#475467]">{experience.category}</td>
                <td className="px-4 py-3 text-[#475467]">{formatCurrency(experience.priceFrom, experience.currency)}</td>
                <td className="px-4 py-3 text-[#475467]">{experience.status}</td>
                <td className="px-4 py-3 text-[#475467]">{experience.featured ? "Sí" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link className="rounded-full border border-[#d0d5dd] px-3 py-1.5 font-semibold text-[#344054]" href={`/admin/experiencias?edit=${experience.slug}`}>
                      Editar
                    </Link>
                    <form action={removeExperience}>
                      <input type="hidden" name="slug" value={experience.slug} />
                      <button className="rounded-full border border-red-200 px-3 py-1.5 font-semibold text-red-700">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <ExperienceForm experience={editing} categories={categories} />
      </div>
      </section>
    </AdminShell>
  );
}
