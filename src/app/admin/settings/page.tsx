import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
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

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-[#f5f1e9] px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
              Yönetim Paneli
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#26352a]">
              Site Ayarları
            </h1>

            <p className="mt-3 text-[#6f756e]">
              Web sitesinde kullanılan iletişim ve
              ana sayfa bilgilerini buradan yönetin.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex w-fit items-center rounded-xl border border-[#d8ddd5] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#faf9f6]"
          >
            ← Dashboard
          </Link>
        </div>

        {/* AYARLAR */}

        <SettingsForm settings={settings} />

      </div>
    </main>
  );
}
