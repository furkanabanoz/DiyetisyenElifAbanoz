import Link from "next/link";

const services = [
{
number: "01",
title: "Kilo Yönetimi",
description:
"Kişisel ihtiyaçlarınızı, yaşam tarzınızı ve hedeflerinizi merkeze alan sürdürülebilir bir beslenme yaklaşımı.",
tag: "Dengeli yaklaşım",
},
{
number: "02",
title: "Online Beslenme Danışmanlığı",
description:
"Bulunduğunuz yerden düzenli takip, kişiye özel planlama ve ihtiyaçlarınıza göre şekillenen danışmanlık süreci.",
tag: "Online takip",
},
{
number: "03",
title: "Sporcu Beslenmesi",
description:
"Performansınızı, toparlanmanızı ve günlük enerji ihtiyaçlarınızı desteklemeye yönelik kişiselleştirilmiş beslenme yaklaşımı.",
tag: "Performans",
},
{
number: "04",
title: "Sağlıklı Beslenme",
description:
"Katı kurallar yerine günlük hayatınıza uyum sağlayan dengeli, gerçekçi ve sürdürülebilir beslenme alışkanlıkları.",
tag: "Yaşam tarzı",
},
];

export default function ServicesSection() {
return (
<section className="relative overflow-hidden bg-[#faf9f6] py-24 sm:py-28 lg:py-36">
{/* Dekoratif arka plan */}
<div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#dce4d5]/40 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* HEADER */}
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#71816a]" />

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#71816a]">
            Hizmetler
          </p>
        </div>

        <h2 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-[#26352a] sm:text-5xl lg:text-[3.5rem]">
          Size uygun bir beslenme
          <br className="hidden sm:block" />
          yaklaşımı oluşturalım.
        </h2>
      </div>

      <div className="max-w-md lg:pb-1">
        <p className="text-base leading-8 text-[#6f756e]">
          Her danışanın ihtiyacı farklıdır. Bu nedenle
          danışmanlık sürecini hedeflerinize ve günlük
          yaşamınıza uyum sağlayacak şekilde planlıyoruz.
        </p>

        <Link
          href="/hizmetler"
          className="group mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[#52624d]"
        >
          <span>Tüm hizmetleri keşfedin</span>

          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>

    {/* SERVICES */}
    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20">
      {services.map((service) => (
        <Link
          key={service.number}
          href="/hizmetler"
          className="group relative overflow-hidden rounded-[2rem] border border-[#26352a]/10 bg-white p-7 shadow-[0_8px_30px_rgba(38,53,42,0.035)] transition-all duration-500 hover:-translate-y-1 hover:border-[#71816a]/30 hover:shadow-[0_20px_50px_rgba(38,53,42,0.09)] sm:p-9"
        >
          {/* Hover arka plan */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#eef3eb] opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="relative">
            {/* Üst satır */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#71816a]">
                {service.number}
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe4dc] text-[#71816a] transition-all duration-300 group-hover:border-[#71816a] group-hover:bg-[#71816a] group-hover:text-white">
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>

            {/* Başlık */}
            <h3 className="mt-12 max-w-lg text-2xl font-semibold tracking-tight text-[#26352a] sm:text-3xl">
              {service.title}
            </h3>

            {/* Açıklama */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6f756e] sm:text-base">
              {service.description}
            </p>

            {/* Alt bölüm */}
            <div className="mt-8 flex items-center justify-between border-t border-[#26352a]/10 pt-5">
              <span className="rounded-full bg-[#eef3eb] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#60705c]">
                {service.tag}
              </span>

              <span className="h-px w-10 bg-[#dce4d5] transition-all duration-500 group-hover:w-16 group-hover:bg-[#71816a]" />
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* ALT CTA */}
    <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-[#26352a] px-7 py-7 sm:flex-row sm:px-9">
      <div>
        <p className="text-lg font-semibold text-white">
          Hangi danışmanlık size uygun?
        </p>

        <p className="mt-1 text-sm leading-6 text-white/60">
          Size en uygun süreci birlikte belirleyebiliriz.
        </p>
      </div>

      <Link
        href="/randevu"
        className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#26352a] transition hover:bg-[#eef3eb]"
      >
        <span>Randevu Al</span>

        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  </div>
</section>

);
}