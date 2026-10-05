const items = [
{
number: "01",
title: "Kişiye Özel",
text: "Her bireyin ihtiyaçları, yaşam tarzı ve hedefleri farklıdır. Yaklaşımımız size özel şekillenir.",
},
{
number: "02",
title: "Bilimsel Yaklaşım",
text: "Güncel, güvenilir ve bilimsel bilgiler doğrultusunda gerçekçi bir beslenme süreci oluşturulur.",
},
{
number: "03",
title: "Sürdürülebilir Değişim",
text: "Geçici diyetler yerine günlük hayatınıza uyum sağlayan, uzun vadede sürdürülebilir alışkanlıklar hedeflenir.",
},
{
number: "04",
title: "Yakın Takip",
text: "Süreç boyunca gelişiminiz takip edilir ve ihtiyaçlarınıza göre planınız yeniden şekillendirilir.",
},
];

export default function TrustSection() {
return (
<section className="relative overflow-hidden border-y border-[#26352a]/10 bg-white">
{/* Dekoratif arka plan */}
<div className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-[#71816a]/30" />

  <div className="mx-auto max-w-7xl">
    {/* Üst açıklama */}
    <div className="border-b border-[#26352a]/10 px-6 py-10 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816a]">
            Yaklaşımımız
          </p>

          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-[#26352a] sm:text-3xl">
            Sağlıklı beslenmeyi hayatınıza
            uyumlu hale getiriyoruz.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#7a8179] md:text-right">
          Amacımız yalnızca bir beslenme programı
          hazırlamak değil, size uzun vadede eşlik
          edecek alışkanlıklar oluşturmak.
        </p>
      </div>
    </div>

    {/* Maddeler */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.number}
          className={`
            group relative p-7 transition-colors duration-300
            hover:bg-[#faf9f6]
            sm:p-8
            lg:p-9
            ${index !== items.length - 1 ? "border-b border-[#26352a]/10 lg:border-b-0 lg:border-r" : ""}
            ${index === 0 ? "md:border-r" : ""}
            ${index === 2 ? "md:border-r-0 lg:border-r" : ""}
          `}
        >
          {/* Numara */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#71816a]">
              {item.number}
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#71816a]/20 text-xs text-[#71816a] transition duration-300 group-hover:border-[#71816a] group-hover:bg-[#71816a] group-hover:text-white">
              →
            </span>
          </div>

          {/* Başlık */}
          <h3 className="mt-8 text-xl font-semibold tracking-tight text-[#26352a]">
            {item.title}
          </h3>

          {/* Açıklama */}
          <p className="mt-4 text-sm leading-7 text-[#6f756e]">
            {item.text}
          </p>

          {/* Alt çizgi */}
          <div className="mt-8 h-px w-10 bg-[#dce4d5] transition-all duration-300 group-hover:w-16 group-hover:bg-[#71816a]" />
        </div>
      ))}
    </div>
  </div>
</section>

);
}