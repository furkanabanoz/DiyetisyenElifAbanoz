type HeroSettings = {
hero_title?: string | null;
hero_description?: string | null;
hero_image_url?: string | null;
};

type Props = {
settings?: HeroSettings | null;
};

export default function Hero({ settings }: Props) {
const heroTitle =
settings?.hero_title ||
"Sağlıklı beslenmeyi hayatınızın bir parçası haline getirin.";

const heroDescription =
settings?.hero_description ||
"Size özel ihtiyaçlarınızı merkeze alan, sürdürülebilir ve bilimsel yaklaşımla beslenme danışmanlığı.";

return (
<section className="overflow-hidden bg-[#faf9f6]">
<div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">

    {/* SOL */}

    <div className="max-w-2xl">
      <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#71816a]/20 bg-[#e4eadf]/60 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#71816a]" />

        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#52624d]">
          Beslenme Danışmanlığı
        </span>
      </div>

      <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#26352a] sm:text-6xl lg:text-7xl">
        {heroTitle}
      </h1>

      <p className="mt-7 max-w-xl text-lg leading-8 text-[#6f756e]">
        {heroDescription}
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href="/randevu"
          className="rounded-full bg-[#71816a] px-8 py-4 text-center text-sm font-medium text-white transition hover:bg-[#52624d]"
        >
          İlk Görüşme İçin Randevu Al
        </a>

        <a
          href="/hakkimda"
          className="rounded-full border border-[#26352a]/10 bg-white px-8 py-4 text-center text-sm font-medium text-[#26352a] transition hover:bg-[#f5f1e9]"
        >
          Beni Tanıyın
        </a>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#6f756e]">
        <span>✓ Kişiye özel yaklaşım</span>
        <span>✓ Online danışmanlık</span>
        <span>✓ Sürdürülebilir plan</span>
      </div>
    </div>

    {/* SAĞ */}

    <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#e4eadf]" />

      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#e9ddce]" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e4eadf]">
        {settings?.hero_image_url ? (
          <img
            src={settings.hero_image_url}
            alt="Beslenme danışmanlığı"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-10 text-center">
            <div>
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/70">
                <span className="text-4xl">
                  🥗
                </span>
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#52624d]">
                Diyetisyen
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#26352a]">
                İsim Soyisim
              </p>

              <p className="mt-3 text-sm leading-6 text-[#6f756e]">
                Profesyonel fotoğrafınızı burada kullanabilirsiniz.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute -bottom-5 right-5 rounded-2xl bg-white p-5 shadow-xl shadow-[#26352a]/10">
        <p className="text-xs uppercase tracking-[0.15em] text-[#71816a]">
          Yaklaşım
        </p>

        <p className="mt-1 text-sm font-semibold text-[#26352a]">
          Bilimsel & Sürdürülebilir
        </p>
      </div>
    </div>
  </div>
</section>


);
}