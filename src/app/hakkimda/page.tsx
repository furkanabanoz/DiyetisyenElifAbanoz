import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { createClient } from "@/app/lib/supabase/server";

export default async function HakkimdaPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select(
      "about_badge, about_title, about_text_1, about_text_2, about_image_url"
    )
    .limit(1)
    .maybeSingle();

  const badge = settings?.about_badge || "HAKKIMDA";

  const title =
    settings?.about_title ||
    "Beslenmeyi hayatınızın daha iyi hissettiren bir parçası haline getirelim.";

  const text1 =
    settings?.about_text_1 ||
    "Beslenme danışmanlığında amacım, kısa süreli ve sürdürülemez listeler yerine günlük hayatınıza uyum sağlayabilecek alışkanlıklar oluşturmanıza yardımcı olmak.";

  const text2 =
    settings?.about_text_2 ||
    "Her bireyin ihtiyaçlarının farklı olduğuna inanıyor ve danışmanlık sürecini kişisel hedefleriniz, yaşam tarzınız ve beklentileriniz doğrultusunda şekillendiriyorum.";

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#f5f1e9]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative px-6 pb-24 pt-20 sm:pb-28 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="mx-auto max-w-7xl">

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">

              <div className="max-w-4xl">

                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#71816a]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#71816a]">
                    {badge}
                  </p>
                </div>

                <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#26352a] sm:text-6xl lg:text-[76px]">
                  Beslenmeye
                  <br />
                  <span className="text-[#71816a]">
                    daha farklı
                  </span>{" "}
                  bir bakış.
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[#6f756e] sm:text-lg">
                  Sağlıklı yaşamı katı kurallardan uzaklaştırıp,
                  hayatınızın gerçek akışına uyum sağlayan
                  sürdürülebilir alışkanlıklara dönüştürmeyi
                  amaçlıyorum.
                </p>

              </div>

              <div className="hidden lg:block">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#cdd5c9]">
                  <span className="text-3xl text-[#71816a]">
                    ✦
                  </span>
                </div>
              </div>

            </div>

            {/* Alt bilgi çizgisi */}

            <div className="mt-16 border-t border-[#d9ddd5] pt-6 lg:mt-20">
              <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.18em] text-[#8a9089] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Beslenme Danışmanlığı
                </span>

                <span>
                  Kişiye Özel • Sürdürülebilir • Dengeli
                </span>
              </div>
            </div>

          </div>
        </section>


        {/* =====================================================
            FOTOĞRAF + HAKKIMDA
        ===================================================== */}

        <section className="bg-white px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">

            <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

              {/* FOTOĞRAF */}

              <div className="relative">

                {/* Dekoratif arka kart */}

                <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2.5rem] bg-[#dce4d5]" />

                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#e9ddce]">

                  {settings?.about_image_url ? (
                    <img
                      src={settings.about_image_url}
                      alt="Diyetisyen"
                      className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-2xl text-[#71816a]">
                          ✦
                        </div>

                        <p className="mt-5 text-sm text-[#71816a]">
                          Fotoğraf henüz eklenmedi.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Fotoğraf üzerindeki küçük etiket */}

                  <div className="absolute bottom-5 left-5 rounded-2xl border border-white/40 bg-white/85 px-5 py-4 shadow-lg backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#71816a]">
                      Yaklaşımım
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#26352a]">
                      Dengeli. Gerçekçi. Sürdürülebilir.
                    </p>
                  </div>

                </div>

              </div>


              {/* METİN */}

              <div className="max-w-2xl">

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#71816a]">
                  Ben Kimim?
                </p>

                <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#26352a] sm:text-5xl">
                  {title}
                </h2>

                <div className="mt-8 space-y-5 text-base leading-8 text-[#6f756e]">
                  <p>
                    {text1}
                  </p>

                  <p>
                    {text2}
                  </p>
                </div>

                {/* Yaklaşım kartları */}

                <div className="mt-10 grid gap-3 sm:grid-cols-3">

                  <div className="rounded-2xl bg-[#f5f1e9] p-5">
                    <span className="text-lg text-[#71816a]">
                      01
                    </span>

                    <p className="mt-4 text-sm font-semibold text-[#26352a]">
                      Kişiye Özel
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#858b84]">
                      Her bireyin ihtiyacına göre.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f5f1e9] p-5">
                    <span className="text-lg text-[#71816a]">
                      02
                    </span>

                    <p className="mt-4 text-sm font-semibold text-[#26352a]">
                      Sürdürülebilir
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#858b84]">
                      Günlük hayata uyum sağlayan.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f5f1e9] p-5">
                    <span className="text-lg text-[#71816a]">
                      03
                    </span>

                    <p className="mt-4 text-sm font-semibold text-[#26352a]">
                      Dengeli
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#858b84]">
                      Yasaklardan uzak bir yaklaşım.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            FELSEFE
        ===================================================== */}

        <section className="bg-[#26352a] px-6 py-24 text-white lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">

            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">

              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#a9b7a2]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a9b7a2]">
                    Yaklaşımım
                  </p>
                </div>

                <p className="mt-6 max-w-xs text-sm leading-7 text-[#aeb7ae]">
                  Sağlıklı beslenmenin hayatınızı
                  zorlaştırması gerektiğine inanmıyorum.
                </p>
              </div>

              <div>

                <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  “Mükemmel beslenmekten çok,
                  <span className="text-[#a9b7a2]">
                    {" "}sizin için doğru olanı
                  </span>{" "}
                  bulmaya odaklanıyorum.”
                </h2>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            DEĞERLER
        ===================================================== */}

        <section className="bg-[#f5f1e9] px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#71816a]">
                Birlikte Çalışırken
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[#26352a] sm:text-5xl">
                Sürecin merkezinde siz varsınız.
              </h2>

              <p className="mt-6 text-base leading-8 text-[#6f756e]">
                Beslenme planını hayatınıza uydurmak yerine,
                hayatınızı sürdürülebilir bir beslenme düzeniyle
                desteklemeyi hedefliyoruz.
              </p>

            </div>


            <div className="mt-14 grid gap-5 md:grid-cols-3">

              <div className="group rounded-[2rem] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(38,53,42,0.08)]">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3eb] text-sm font-semibold text-[#71816a]">
                  01
                </div>

                <h3 className="mt-8 text-xl font-semibold text-[#26352a]">
                  Sizi Dinliyorum
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#7b817b]">
                  Hedeflerinizi, günlük rutininizi ve beslenme
                  alışkanlıklarınızı anlamaya odaklanıyorum.
                </p>

              </div>


              <div className="group rounded-[2rem] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(38,53,42,0.08)]">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3eb] text-sm font-semibold text-[#71816a]">
                  02
                </div>

                <h3 className="mt-8 text-xl font-semibold text-[#26352a]">
                  Size Özel Planlıyorum
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#7b817b]">
                  İhtiyaçlarınıza ve yaşam tarzınıza uygun,
                  uygulanabilir bir yol haritası oluşturuyorum.
                </p>

              </div>


              <div className="group rounded-[2rem] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(38,53,42,0.08)]">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3eb] text-sm font-semibold text-[#71816a]">
                  03
                </div>

                <h3 className="mt-8 text-xl font-semibold text-[#26352a]">
                  Birlikte İlerliyoruz
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#7b817b]">
                  Değişen ihtiyaçlarınıza göre süreci birlikte
                  değerlendiriyor ve gerektiğinde yeniden şekillendiriyoruz.
                </p>

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

              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/20" />

              <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#71816a]/10" />

              <div className="relative">

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#60705c]">
                  İlk Adım
                </p>

                <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-[#26352a] sm:text-5xl">
                  Sağlıklı yaşam yolculuğunuza birlikte başlayalım.
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#687267]">
                  Size uygun bir beslenme yaklaşımı oluşturmak
                  için ilk adımı atabilirsiniz.
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
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl border border-[#bfcabb] bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#52624d] transition hover:bg-white"
                  >
                    Ana Sayfaya Dön
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
