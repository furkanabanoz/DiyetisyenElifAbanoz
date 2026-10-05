import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

export default async function AboutSection() {
const supabase = await createClient();

const { data: settings } = await supabase
.from("site_settings")
.select(
"about_badge, about_title, about_text_1, about_text_2, about_image_url"
)
.limit(1)
.maybeSingle();

const badge =
settings?.about_badge || "Merhaba, ben İsim Soyisim";

const title =
settings?.about_title ||
"Sağlıklı yaşamın katı kurallardan ibaret olduğuna inanmıyorum.";

const text1 =
settings?.about_text_1 ||
"Beslenme danışmanlığında amacım, kısa süreli ve sürdürülemez listeler yerine günlük hayatınıza uyum sağlayabilecek alışkanlıklar oluşturmanıza yardımcı olmak.";

const text2 =
settings?.about_text_2 ||
"Her bireyin ihtiyaçlarının farklı olduğuna inanıyor ve danışmanlık sürecini kişisel hedefleriniz, yaşam tarzınız ve beklentileriniz doğrultusunda şekillendiriyorum.";

return (
<section className="relative overflow-hidden bg-[#f5f1e9] py-24 sm:py-28 lg:py-36">
{/* Dekoratif arka plan */}
<div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#dce4d5]/50 blur-3xl" />
<div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#e9ddce]/40 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* Üst başlık */}
    <div className="mb-14 flex flex-col gap-5 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#71816a]">
          Hakkımda
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#26352a] sm:text-3xl">
          Beslenmeye daha gerçekçi bir bakış.
        </h2>
      </div>

      <p className="max-w-md text-sm leading-7 text-[#7a8179] lg:text-right">
        Sağlıklı yaşamın herkes için aynı görünmediğine
        inanıyor, danışmanlık sürecini kişiye özel
        ihtiyaçlar doğrultusunda şekillendiriyorum.
      </p>
    </div>

    {/* Ana içerik */}
    <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
      {/* FOTOĞRAF */}
      <div className="relative">
        {/* Arka dekoratif çerçeve */}
        <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[2.5rem] bg-[#dce4d5]" />

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#e9ddce] shadow-[0_25px_70px_rgba(38,53,42,0.12)]">
          {settings?.about_image_url ? (
            <img
              src={settings.about_image_url}
              alt="Diyetisyen hakkında"
              className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-end bg-gradient-to-br from-[#e9ddce] via-[#e5dccf] to-[#dce4d5] p-8 sm:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816a]">
                  Hakkımda
                </p>

                <p className="mt-3 max-w-xs text-3xl font-semibold leading-tight text-[#26352a]">
                  Beslenmeye farklı bir bakış.
                </p>
              </div>
            </div>
          )}

          {/* Fotoğraf üzerindeki küçük etiket */}
          <div className="absolute bottom-5 left-5 rounded-2xl border border-white/60 bg-white/90 px-5 py-4 shadow-lg backdrop-blur-md sm:bottom-7 sm:left-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#71816a]">
              Beslenme
            </p>

            <p className="mt-1 text-sm font-semibold text-[#26352a]">
              Kişiye özel yaklaşım
            </p>
          </div>
        </div>
      </div>

      {/* METİN */}
      <div className="lg:pl-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#71816a]">
          {badge}
        </p>

        <h3 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-[#26352a] sm:text-5xl lg:text-[3.35rem]">
          {title}
        </h3>

        <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[#6f756e]">
          <p>{text1}</p>

          <p>{text2}</p>
        </div>

        {/* Vurgu alanı */}
        <div className="mt-9 border-l-2 border-[#71816a] bg-white/50 px-5 py-4">
          <p className="text-sm leading-7 text-[#596458]">
            Amacımız kusursuz olmak değil; sizin için
            doğru olanı bulmak ve bunu sürdürülebilir
            hale getirmek.
          </p>
        </div>

        {/* Buton */}
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link
            href="/hakkimda"
            className="group inline-flex items-center gap-4 rounded-full bg-[#71816a] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#52624d] hover:shadow-lg hover:shadow-[#71816a]/20"
          >
            <span>Hakkımda Daha Fazla</span>

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#8a9089]">
            Sürdürülebilir · Bilimsel · Kişisel
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

);
}