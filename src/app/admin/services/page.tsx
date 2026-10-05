import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ServicesManager from "./ServicesManager";

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login");
  }

  const { data: services, error } = await supabase
    .from("services")
    .select(
      `
        id,
        title,
        slug,
        short_description,
        description,
        icon,
        price,
        features,
        seo_title,
        seo_description,
        is_active
      `
    )
    .order("title", { ascending: true });

  if (error) {
    console.error("Hizmetler alınamadı:", error);
  }

  return (
    <main className="min-h-screen bg-[#f5f1e9] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* ÜST ALAN */}

        <div className="mb-10">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
                Yönetim Paneli
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#26352a]">
                Hizmetler
              </h1>
            </div>

            <Link
              href="/admin"
              className="inline-flex w-fit items-center rounded-xl border border-[#d8ddd5] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#eef3eb] hover:text-[#52624d]"
            >
              ← Dashboard
            </Link>

          </div>

          <p className="max-w-2xl text-[#6f756e]">
            Web sitenizde gösterilen hizmetleri buradan
            ekleyebilir, düzenleyebilir, silebilir veya
            pasif hale getirebilirsiniz.
          </p>

        </div>

        {/* HİZMET YÖNETİMİ */}

        <ServicesManager services={services ?? []} />

      </div>
    </main>
  );
}
