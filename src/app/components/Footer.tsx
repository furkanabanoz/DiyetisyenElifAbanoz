"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type FooterSettings = {
  email: string | null;
  phone: string | null;
  instagram_url: string | null;
  logo_url: string | null;
};

export default function Footer() {
  const [settings, setSettings] =
    useState<FooterSettings>({
      email: null,
      phone: null,
      instagram_url: null,
      logo_url: null,
    });

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase
        .from("site_settings")
        .select(
          "email, phone, instagram_url, logo_url"
        )
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(
          "Footer ayarları alınamadı:",
          error
        );
        return;
      }

      if (data) {
        setSettings({
          email: data.email || null,
          phone: data.phone || null,
          instagram_url:
            data.instagram_url || null,
          logo_url: data.logo_url || null,
        });
      }
    }

    loadSettings();
  }, []);

  const email =
    settings.email?.trim() || "";

  const phone =
    settings.phone?.trim() || "";

  const instagramUrl =
    settings.instagram_url?.trim() || "";

  const logoUrl =
    settings.logo_url?.trim() || "";

  return (
    <footer className="bg-[#26352a] text-white">
      {/* ANA FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-16 lg:px-8 lg:py-24">

        {/* MARKA */}
        <div>
          <a
            href="/"
            className="group inline-flex items-center gap-4"
          >
            {logoUrl ? (
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                <img
                  src={logoUrl}
                  alt="Diyetisyen logo"
                  className="h-full w-full object-contain"
                />
              </div>
            ) : null}

            <span className="text-xl font-semibold tracking-[0.14em] text-white transition group-hover:text-[#b9c7b2]">
              DİYETİSYEN
            </span>
          </a>

          <div className="mt-6 h-px w-12 bg-[#71816a]" />

          <p className="mt-6 max-w-sm text-[15px] leading-8 text-white/60">
            Kişiye özel, sürdürülebilir ve bilimsel
            beslenme danışmanlığı.
          </p>

          <a
            href="/randevu"
            className="mt-8 inline-flex rounded-full bg-[#71816a] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#82937a]"
          >
            Randevu Al
          </a>
        </div>

        {/* KEŞFET */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">
            Keşfet
          </h3>

          <div className="mt-7 flex flex-col gap-4 text-sm text-white/55">
            <a
              href="/hakkimda"
              className="transition hover:translate-x-1 hover:text-white"
            >
              Hakkımda
            </a>

            <a
              href="/hizmetler"
              className="transition hover:translate-x-1 hover:text-white"
            >
              Hizmetler
            </a>

            <a
              href="/blog"
              className="transition hover:translate-x-1 hover:text-white"
            >
              Blog
            </a>

            <a
              href="/tarifler"
              className="transition hover:translate-x-1 hover:text-white"
            >
              Tarifler
            </a>
          </div>
        </div>

        {/* YARDIM */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">
            Yardım
          </h3>

          <div className="mt-7 flex flex-col gap-4 text-sm text-white/55">
            <a
              href="/sss"
              className="transition hover:translate-x-1 hover:text-white"
            >
              Sık Sorulan Sorular
            </a>

            <a
              href="/iletisim"
              className="transition hover:translate-x-1 hover:text-white"
            >
              İletişim
            </a>

            <a
              href="/randevu"
              className="transition hover:translate-x-1 hover:text-white"
            >
              Randevu Al
            </a>
          </div>
        </div>

        {/* İLETİŞİM */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">
            İletişim
          </h3>

          <div className="mt-7 flex flex-col gap-5 text-sm">

            {/* E-POSTA */}
            {email && (
              <a
                href={`mailto:${email}`}
                className="group flex items-start gap-3 text-white/60 transition hover:text-white"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm text-[#b9c7b2] transition group-hover:bg-[#71816a] group-hover:text-white">
                  ✉
                </span>

                <span className="break-all pt-1">
                  {email}
                </span>
              </a>
            )}

            {/* TELEFON */}
            {phone && (
              <a
                href={`tel:${phone.replace(
                  /[^0-9+]/g,
                  ""
                )}`}
                className="group flex items-start gap-3 text-white/60 transition hover:text-white"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm text-[#b9c7b2] transition group-hover:bg-[#71816a] group-hover:text-white">
                  ☎
                </span>

                <span className="pt-1">
                  {phone}
                </span>
              </a>
            )}

            {/* INSTAGRAM */}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-white/60 transition hover:text-white"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm text-[#b9c7b2] transition group-hover:bg-[#71816a] group-hover:text-white">
                  ◎
                </span>

                <span className="pt-1">
                  Instagram
                </span>
              </a>
            )}

          </div>
        </div>
      </div>

      {/* ALT FOOTER */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-8">

          <p>
            © 2026 DiyetisyenElifAbanoz Tüm hakları saklıdır.
          </p>

          <div className="flex gap-6">
            <a
              href="/gizlilik"
              className="transition hover:text-white"
            >
              Gizlilik
            </a>

            <a
              href="/cerez-politikasi"
              className="transition hover:text-white"
            >
              Çerez Politikası
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
