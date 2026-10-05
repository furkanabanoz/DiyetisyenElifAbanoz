import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { createClient } from "@/app/lib/supabase/server";

type Service = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  price: string | null;
  features: unknown;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  sort_order: number;
};

function getFeatures(features: unknown): string[] {
  if (!Array.isArray(features)) {
    return [];
  }

  return features.filter(
    (item): item is string => typeof item === "string"
  );
}

export default async function HizmetlerPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
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
        is_active,
        sort_order
      `
    )
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  const activeServices: Service[] = services ?? [];

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#f5f1e9]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative px-6 pb-20 pt-20 sm:pb-24 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-7xl">

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">

              <div className="max-w-4xl">

                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#71816a]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#71816a]">
                    Hizmetler
                  </p>
                </div>

                <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#26352a] sm:text-6xl lg:text-[76px]">
                  Size uygun
                  <br />
                  <span className="text-[#71816a]">
                    bir yol
                  </span>{" "}
                  birlikte çizelim.
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[#6f756e] sm:text-lg">
                  İhtiyaçlarınıza, hedeflerinize ve yaşam tarzınıza
                  uygun danışmanlık seçeneklerini keşfedin.
                  Her süreç kişiye özel olarak planlanır.
                </p>

              </div>

              <div className="hidden lg:flex lg:h-24 lg:w-24 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-[#cdd5c9]">
                <span className="text-3xl text-[#71816a]">
                  ✦
                </span>
              </div>

            </div>

            <div className="mt-16 border-t border-[#d9ddd5] pt-6 lg:mt-20">
              <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.18em] text-[#8a9089] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Kişiye Özel Beslenme Danışmanlığı
                </span>

                <span>
                  {activeServices.length} Hizmet
                </span>
              </div>
            </div>

          </div>
        </section>


        {/* =====================================================
            HİZMETLER
        ===================================================== */}

        <section className="bg-white px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">

            {activeServices.length === 0 ? (
              <div className="rounded-[2.5rem] bg-[#f5f1e9] px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dce4d5] text-2xl text-[#71816a]">
                  ✦
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-[#26352a]">
                  Hizmetler yakında burada.
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#7a8179]">
                  Şu anda aktif bir hizmet bulunmuyor.
                  Yönetim panelinden yeni hizmetler ekleyebilirsiniz.
                </p>

                <Link
                  href="/"
                  className="mt-7 inline-flex items-center rounded-xl bg-[#52624d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#43523f]"
                >
                  Ana Sayfaya Dön
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">

                {activeServices.map((service, index) => {
                  const features = getFeatures(service.features);

                  return (
                    <article
                      key={service.id}
                      className={`group relative overflow-hidden rounded-[2rem] border border-[#e4e8e1] bg-[#fafbf9] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#d3dbcf] hover:bg-white hover:shadow-[0_24px_60px_rgba(38,53,42,0.08)] sm:p-9 ${
                        index === 0
                          ? "md:col-span-2 lg:p-10"
                          : ""
                      }`}
                    >

                      {/* Dekoratif daire */}

                      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#dce4d5]/50 transition duration-500 group-hover:scale-110" />

                      <div className="relative">

                        {/* ÜST */}

                        <div className="flex items-start justify-between gap-6">

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dce4d5] text-xl text-[#52624d]">
                            {service.icon || "✦"}
                          </div>

                          <span className="text-xs font-medium tracking-[0.15em] text-[#9aa198]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                        </div>


                        {/* BAŞLIK */}

                        <div
                          className={
                            index === 0
                              ? "mt-10 max-w-3xl"
                              : "mt-8"
                          }
                        >
                          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#26352a] sm:text-3xl">
                            {service.title}
                          </h2>

                          {service.short_description && (
                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6f756e]">
                              {service.short_description}
                            </p>
                          )}
                        </div>


                        {/* AÇIKLAMA */}

                        {service.description && (
                          <p className="relative mt-5 max-w-2xl text-sm leading-7 text-[#858b84]">
                            {service.description}
                          </p>
                        )}


                        {/* ALT ALAN */}

                        <div
                          className={`mt-8 grid gap-7 border-t border-[#e4e8e1] pt-7 ${
                            index === 0
                              ? "lg:grid-cols-[1fr_auto]"
                              : ""
                          }`}
                        >

                          {/* ÖZELLİKLER */}

                          <div>
                            {features.length > 0 && (
                              <div className="grid gap-3 sm:grid-cols-2">

                                {features.map(
                                  (feature, featureIndex) => (
                                    <div
                                      key={`${service.id}-${featureIndex}`}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef3eb] text-[10px] text-[#71816a]">
                                        ✓
                                      </span>

                                      <span className="text-sm leading-6 text-[#667067]">
                                        {feature}
                                      </span>
                                    </div>
                                  )
                                )}

                              </div>
                            )}

                            {features.length === 0 && (
                              <p className="text-sm text-[#929991]">
                                Kişiye özel danışmanlık süreci.
                              </p>
                            )}
                          </div>


                          {/* FİYAT */}

                          {service.price && (
                            <div className="shrink-0 lg:text-right">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9aa198]">
                                Ücret
                              </p>

                              <p className="mt-2 text-lg font-semibold text-[#52624d]">
                                {service.price}
                              </p>
                            </div>
                          )}

                        </div>


                        {/* CTA */}

                        <div className="mt-8">

                          <Link
                            href={`/hizmetler/${service.slug}`}
                            className="inline-flex items-center text-sm font-semibold text-[#52624d] transition group-hover:text-[#3f4f3b]"
                          >
                            Hizmeti incele

                            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </Link>

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

          </div>
        </section>


        {/* =====================================================
            NASIL ÇALIŞIYORUZ
        ===================================================== */}

        <section className="bg-[#26352a] px-6 py-24 text-white lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">

            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">

              <div>

                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#a9b7a2]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a9b7a2]">
                    Süreç
                  </p>
                </div>

                <h2 className="mt-6 max-w-md text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                  Sadece bir liste değil, bir sistem.
                </h2>

              </div>

              <div className="grid gap-8 sm:grid-cols-3">

                <div>
                  <span className="text-sm text-[#a9b7a2]">
                    01
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">
                    Tanışıyoruz
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#aeb7ae]">
                    Hedeflerinizi ve günlük yaşamınızı
                    birlikte değerlendiriyoruz.
                  </p>
                </div>

                <div>
                  <span className="text-sm text-[#a9b7a2]">
                    02
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">
                    Planlıyoruz
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#aeb7ae]">
                    Size özel, uygulanabilir ve sürdürülebilir
                    bir beslenme planı oluşturuyoruz.
                  </p>
                </div>

                <div>
                  <span className="text-sm text-[#a9b7a2]">
                    03
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">
                    Takip Ediyoruz
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#aeb7ae]">
                    Süreci birlikte takip ediyor ve ihtiyaçlara
                    göre yeniden şekillendiriyoruz.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="bg-white px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">

            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#dce4d5] px-7 py-14 text-center sm:px-12 sm:py-20">

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/25" />

              <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#71816a]/10" />

              <div className="relative">

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#60705c]">
                  Hazır mısınız?
                </p>

                <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-[#26352a] sm:text-5xl">
                  Kendiniz için iyi bir adım atın.
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#687267]">
                  Size uygun danışmanlık sürecini birlikte
                  planlamak için ilk adımı atabilirsiniz.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                  <Link
                    href="/randevu"
                    className="inline-flex items-center justify-center rounded-xl bg-[#52624d] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#43523f] hover:shadow-lg"
                  >
                    Randevu Oluştur
                    <span className="ml-3">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/hakkimda"
                    className="inline-flex items-center justify-center rounded-xl border border-[#bfcabb] bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#52624d] transition hover:bg-white"
                  >
                    Hakkımda
                  </Link>

                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
