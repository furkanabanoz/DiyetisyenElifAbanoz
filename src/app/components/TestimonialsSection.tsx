const testimonials = [
{
text: "Buraya gerçek ve izin alınmış danışan yorumlarından biri gelecek.",
name: "Danışan Adı",
detail: "Online danışmanlık",
},
{
text: "Gerçek danışan deneyimi burada yer alacak.",
name: "Danışan Adı",
detail: "Beslenme danışmanlığı",
},
{
text: "İzin verilen gerçek bir yorum burada gösterilecek.",
name: "Danışan Adı",
detail: "Kilo yönetimi",
},
];

export default function TestimonialsSection() {
return (
<section className="relative overflow-hidden bg-[#f5f1e9] py-24 lg:py-32">
{/* DEKORATİF ARKA PLAN */}

  <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-[#dce4d5]/60 blur-3xl" />

  <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#e9ddce]/60 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

    {/* BAŞLIK */}

    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-3 rounded-full border border-[#71816a]/20 bg-white/60 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#71816a]" />

        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52624d]">
          Danışan Deneyimleri
        </span>
      </div>

      <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#26352a] sm:text-5xl lg:text-6xl">
        Değişim yolculuğunda
        <br className="hidden sm:block" />
        birlikte ilerliyoruz.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#6f756e] sm:text-lg">
        Beslenme danışmanlığında en önemli şeylerden biri,
        sürecin kişinin hayatına gerçekten uyum sağlamasıdır.
        Burada gerçek ve izin alınmış danışan deneyimlerine
        yer verebilirsiniz.
      </p>
    </div>

    {/* YORUMLAR */}

    <div className="mt-16 grid gap-5 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <article
          key={`${testimonial.name}-${index}`}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[2rem] border border-[#26352a]/8 bg-white p-8 shadow-[0_10px_40px_rgba(38,53,42,0.04)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(38,53,42,0.10)] sm:p-9"
        >
          {/* ÜST DEKOR */}

          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4eadf]">
              <span className="text-2xl font-serif text-[#71816a]">
                “
              </span>
            </div>

            <span className="text-xs font-medium text-[#a0a69f]">
              0{index + 1}
            </span>
          </div>

          {/* YORUM */}

          <p className="mt-8 flex-1 text-[17px] leading-8 text-[#526052]">
            {testimonial.text}
          </p>

          {/* ALT */}

          <div className="mt-8 flex items-center gap-4 border-t border-[#26352a]/10 pt-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dce4d5]">
              <span className="text-sm font-semibold text-[#52624d]">
                {testimonial.name.charAt(0)}
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#26352a]">
                {testimonial.name}
              </p>

              <p className="mt-1 text-xs text-[#7b817a]">
                {testimonial.detail}
              </p>
            </div>
          </div>

          {/* HOVER DEKORASYON */}

          <div className="pointer-events-none absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-[#e4eadf]/50 transition duration-500 group-hover:scale-150" />
        </article>
      ))}
    </div>

    {/* ALT MESAJ */}

    <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[1.75rem] border border-[#26352a]/8 bg-white/60 px-6 py-6 text-center sm:flex-row sm:text-left sm:px-8">
      <div>
        <p className="text-sm font-semibold text-[#26352a]">
          Sizin hikâyeniz de burada başlayabilir.
        </p>

        <p className="mt-1 text-sm text-[#6f756e]">
          Size uygun beslenme yaklaşımını birlikte oluşturalım.
        </p>
      </div>

      <a
        href="/randevu"
        className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#71816a] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#52624d] hover:shadow-lg hover:shadow-[#71816a]/20"
      >
        Randevu Al
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  </div>
</section>

);
}