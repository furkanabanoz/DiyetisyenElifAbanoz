export default function CTASection() {
return (
<section className="bg-[#faf9f6] px-6 py-10 sm:py-12 lg:px-8 lg:py-16">
<div className="mx-auto max-w-7xl">
<div className="relative overflow-hidden rounded-[2.5rem] bg-[#26352a] px-7 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-28">
{/* DEKORATİF ŞEKİLLER */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#71816a]/30 blur-2xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#b9c7b2]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[12%] top-[20%] h-24 w-24 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute bottom-[18%] left-[10%] h-16 w-16 rounded-full border border-white/10" />

      {/* İÇERİK */}

      <div className="relative mx-auto max-w-4xl">
        <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#b9c7b2]" />

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dce4d5]">
            İlk Adım
          </span>
        </div>

        <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Sağlıklı beslenme yolculuğunuza
          <span className="text-[#b9c7b2]"> bugün başlayın.</span>
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          Size uygun danışmanlık seçeneğini keşfedin, hedeflerinizi
          konuşalım ve sürdürülebilir bir beslenme yaklaşımını birlikte
          oluşturalım.
        </p>

        {/* BUTONLAR */}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/randevu"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#26352a] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#f5f1e9] sm:w-auto"
          >
            Randevu Al

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="/iletisim"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium text-white transition duration-300 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            İletişime Geç
          </a>
        </div>

        {/* ALT BİLGİ */}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-white/45">
          <span className="inline-flex items-center gap-2">
            <span className="text-[#b9c7b2]">✓</span>
            Kişiye özel yaklaşım
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

          <span className="inline-flex items-center gap-2">
            <span className="text-[#b9c7b2]">✓</span>
            Sürdürülebilir alışkanlıklar
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

          <span className="inline-flex items-center gap-2">
            <span className="text-[#b9c7b2]">✓</span>
            Bilimsel yaklaşım
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

);
}