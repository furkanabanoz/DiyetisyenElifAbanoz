"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
  console.error("LOGIN ERROR:", loginError);

  setError(loginError.message);
  setLoading(false);
  return;
}

    if (!data.user) {
      setError("Giriş yapılamadı.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } =
  await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", data.user.id)
    .single();

console.log("AUTH USER:", data.user);
console.log("PROFILE:", profile);
console.log("PROFILE ERROR:", profileError);

if (profileError) {
  await supabase.auth.signOut();

  setError(
    `Profil okunamadı: ${profileError.message}`
  );

  setLoading(false);
  return;
}

if (profile?.role !== "admin") {
  await supabase.auth.signOut();

  setError(
    `Yetki hatası. Veritabanındaki rol: ${profile?.role ?? "bulunamadı"}`
  );

  setLoading(false);
  return;
}

router.push("/admin");
router.refresh();

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-emerald-700 mb-3">
              DİYETİSYEN ELİF ABANOZ
            </p>

            <h1 className="text-3xl font-semibold text-gray-900">
              Yönetici Girişi
            </h1>

            <p className="text-gray-500 mt-3">
              Yönetim paneline devam etmek için giriş yapın.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-posta
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="ornek@email.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Şifre
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-700 px-4 py-3.5 font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-emerald-700 transition"
            >
              ← Web sitesine dön
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}