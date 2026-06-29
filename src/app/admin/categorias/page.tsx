import { removeCategory, upsertCategory } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";
import { getCategories } from "@/lib/store";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await getCategories();

  return (
    <AdminShell>
      <section>
      <h1 className="text-3xl font-bold text-[#101828]">Categorías</h1>
      <form action={upsertCategory} className="mt-6 flex flex-col gap-3 rounded-[24px] border border-[#e4e7ec] bg-white p-5 shadow-sm sm:flex-row">
        <input name="name" placeholder="Nueva categoría" className="field" />
        <button className="h-11 rounded-full bg-[#101828] px-5 text-sm font-semibold text-white">
          Guardar
        </button>
      </form>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="rounded-[24px] border border-[#e4e7ec] bg-white p-5 shadow-sm">
            <p className="font-semibold text-[#101828]">{category.name}</p>
            <p className="mt-1 text-sm text-[#667085]">/{category.slug}</p>
            <form action={removeCategory} className="mt-4">
              <input type="hidden" name="slug" value={category.slug} />
              <button className="text-sm font-semibold text-red-700">Eliminar</button>
            </form>
          </div>
        ))}
      </div>
      </section>
    </AdminShell>
  );
}
