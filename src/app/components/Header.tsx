"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const navigation = [
{ name: "Ana Sayfa", href: "/" },
{ name: "Hakkımda", href: "/hakkimda" },
{ name: "Hizmetler", href: "/hizmetler" },
{ name: "Blog", href: "/blog" },
{ name: "İletişim", href: "/iletisim" },
];

type NavbarSettings = {
header_badge: string;
header_title: string;
header_logo_url: string | null;
};

export default function Header() {
const pathname = usePathname();

const [menuOpen, setMenuOpen] = useState(false);

const [navbarSettings, setNavbarSettings] =
useState<NavbarSettings>({
header_badge: "DİYETİSYEN",
header_title: "Beslenme Danışmanlığı",
header_logo_url: null,
});

/*

NAVBAR AYARLARINI SUPABASE'DEN AL
*/
useEffect(() => {
async function loadNavbarSettings() {
const { data, error } = await supabase
.from("site_settings")
.select(
"header_badge, header_title, header_logo_url"
)
.limit(1)
.maybeSingle();

if (error) {
console.error(
"Navbar ayarları alınamadı:",
error
);
return;
}

if (data) {
setNavbarSettings({
header_badge:
data.header_badge ||
"DİYETİSYEN",

 header_title:
   data.header_title ||
   "Beslenme Danışmanlığı",

 header_logo_url:
   data.header_logo_url || null,

});
}
}

loadNavbarSettings();

}, []);

/*

SAYFA DEĞİŞİNCE MOBİL MENÜYÜ KAPAT
*/
useEffect(() => {
setMenuOpen(false);
}, [pathname]);

/*

MOBİL MENÜ AÇIKKEN SAYFA KAYMASIN
*/
useEffect(() => {
document.body.style.overflow =
menuOpen ? "hidden" : "";

return () => {
  document.body.style.overflow = "";
};

}, [menuOpen]);

/*

AKTİF SAYFA
*/
const isActive = (href: string) => {
if (href === "/") {
return pathname === "/";
}

return (
  pathname === href ||
  pathname.startsWith(`${href}/`)
);

};

return (
<header className="sticky top-0 z-50 border-b border-[#26352a]/8 bg-[#faf9f6]/90 backdrop-blur-xl">
<div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

    {/* LOGO */}

    <Link
      href="/"
      aria-label={`${navbarSettings.header_badge} ana sayfa`}
      className="group flex min-w-0 items-center gap-3"
    >
      {/* LOGO GÖRSELİ */}

      {navbarSettings.header_logo_url ? (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#26352a]/8 bg-white shadow-sm transition duration-300 group-hover:shadow-md">
          <img
            src={navbarSettings.header_logo_url}
            alt={
              navbarSettings.header_badge ||
              "Diyetisyen"
            }
            className="h-full w-full object-contain p-1.5"
          />
        </div>
      ) : (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e4eadf] text-[#52624d]">
          <span className="text-sm font-semibold">
            D
          </span>
        </div>
      )}

      {/* MARKA YAZISI */}

      <div className="min-w-0">
        <span className="block truncate text-[15px] font-semibold tracking-[0.12em] text-[#26352a] transition-colors duration-300 group-hover:text-[#71816a] sm:text-base">
          {navbarSettings.header_badge}
        </span>

        <span className="mt-0.5 block truncate text-[9px] font-medium uppercase tracking-[0.22em] text-[#71816a] sm:text-[10px]">
          {navbarSettings.header_title}
        </span>
      </div>
    </Link>

    {/* DESKTOP NAVIGATION */}

    <nav
      aria-label="Ana navigasyon"
      className="hidden items-center gap-1 lg:flex"
    >
      {navigation.map((item) => {
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={
              active ? "page" : undefined
            }
            className={`group relative rounded-full px-4 py-2.5 text-sm transition-all duration-200 ${
              active
                ? "bg-[#e4eadf] font-medium text-[#52624d]"
                : "text-[#596458] hover:bg-[#f0eee8] hover:text-[#26352a]"
            }`}
          >
            {item.name}

            {!active && (
              <span className="absolute bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[#71816a] transition-all duration-300 group-hover:w-5" />
            )}
          </Link>
        );
      })}

      {/* RANDEVU */}

      <Link
        href="/randevu"
        className={`ml-3 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
          pathname === "/randevu"
            ? "bg-[#52624d]"
            : "bg-[#71816a] hover:bg-[#52624d]"
        }`}
      >
        Randevu Al

        <span className="transition-transform duration-300">
          →
        </span>
      </Link>
    </nav>

    {/* MOBILE MENU BUTTON */}

    <button
      type="button"
      onClick={() =>
        setMenuOpen((current) => !current)
      }
      aria-label={
        menuOpen
          ? "Menüyü kapat"
          : "Menüyü aç"
      }
      aria-expanded={menuOpen}
      aria-controls="mobile-navigation"
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#26352a]/10 bg-white/70 transition-all duration-200 hover:bg-[#f0eee8] lg:hidden"
    >
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-[#26352a] transition-all duration-300 ${
          menuOpen
            ? "rotate-45"
            : "-translate-y-1.5"
        }`}
      />

      <span
        className={`absolute h-0.5 w-5 rounded-full bg-[#26352a] transition-all duration-200 ${
          menuOpen
            ? "opacity-0"
            : "opacity-100"
        }`}
      />

      <span
        className={`absolute h-0.5 w-5 rounded-full bg-[#26352a] transition-all duration-300 ${
          menuOpen
            ? "-rotate-45"
            : "translate-y-1.5"
        }`}
      />
    </button>
  </div>

  {/* MOBILE MENU */}

  <div
    id="mobile-navigation"
    className={`overflow-hidden border-t border-[#26352a]/8 bg-[#faf9f6] transition-all duration-300 ease-in-out lg:hidden ${
      menuOpen
        ? "max-h-[600px] opacity-100"
        : "max-h-0 opacity-0"
    }`}
  >
    <nav
      aria-label="Mobil navigasyon"
      className="mx-auto max-w-7xl px-5 pb-7 pt-3 sm:px-6"
    >
      {/* MOBİL NAVIGATION */}

      <div className="rounded-[1.5rem] border border-[#26352a]/8 bg-white p-2 shadow-sm">
        {navigation.map((item, index) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                active ? "page" : undefined
              }
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm transition ${
                active
                  ? "bg-[#e4eadf] font-semibold text-[#52624d]"
                  : "text-[#26352a] hover:bg-[#f5f1e9]"
              }`}
            >
              <span>{item.name}</span>

              <span
                className={`text-lg transition-transform ${
                  active
                    ? "translate-x-0 text-[#71816a]"
                    : "-translate-x-1 text-[#a0a79f]"
                }`}
              >
                →
              </span>
            </Link>
          );
        })}
      </div>

      {/* MOBILE RANDEVU */}

      <Link
        href="/randevu"
        className={`mt-3 flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white shadow-sm transition ${
          pathname === "/randevu"
            ? "bg-[#52624d]"
            : "bg-[#71816a] hover:bg-[#52624d]"
        }`}
      >
        Randevu Al

        <span>→</span>
      </Link>

      {/* ALT MESAJ */}

      <p className="mt-5 text-center text-xs leading-5 text-[#8a9089]">
        Size özel, sürdürülebilir ve
        bilimsel beslenme yaklaşımı.
      </p>
    </nav>
  </div>
</header>

);
}