"use client";

import { useState } from "react";

const faqs = [
{
question: "İlk görüşmede neler konuşuluyor?",
answer:
"İlk görüşmede hedefleriniz, günlük yaşamınız, beslenme alışkanlıklarınız ve ihtiyaçlarınız birlikte değerlendirilir. Görüşmenin içeriği tamamen size ve hedeflerinize göre şekillenir.",
},
{
question: "Online danışmanlık yapıyor musunuz?",
answer:
"Evet. Online danışmanlık seçeneği ile bulunduğunuz yerden görüşmelere katılabilirsiniz. Görüşmeler belirlenen dijital platform üzerinden gerçekleştirilir.",
},
{
question: "Beslenme planı kişiye özel mi?",
answer:
"Evet. Hazırlanan beslenme yaklaşımı; hedefleriniz, yaşam tarzınız, günlük rutininiz, beslenme alışkanlıklarınız ve kişisel ihtiyaçlarınız dikkate alınarak oluşturulur.",
},
{
question: "Randevu nasıl oluşturabilirim?",
answer:
"Randevu sayfasından size uygun görüşme seçeneğini inceleyebilir ve uygun bir zaman seçerek randevu talebinizi oluşturabilirsiniz.",
},
];

export default function FAQSection() {
const [openIndex, setOpenIndex] = useState<number | null>(0);

function toggleFaq(index: number) {
setOpenIndex((current) => (current === index ? null : index));
}

return (
<section className="relative overflow-hidden bg-white px-6 py-24 lg:py-32">
{/* Dekoratif arka plan */}

  <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#e4eadf]/60 blur-3xl" />

  <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#f5f1e9] blur-3xl" />

  <div className="relative mx-auto max-w-7xl">
    <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
      {/* SOL ALAN */}

      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#71816a]/20 bg-[#eef3eb] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#71816a]" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52624d]">
            Sık Sorulan Sorular
          </span>
        </div>

        <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#26352a] sm:text-5xl lg:text-6xl">
          Aklınızdaki sorulara
          <span className="text-[#71816a]"> cevaplar.</span>
        </h2>

        <p className="mt-6 max-w-md text-base leading-8 text-[#6f756e]">
          Danışmanlık süreci, görüşmeler ve beslenme yaklaşımı hakkında
          merak ettiğiniz temel bilgileri burada bulabilirsiniz.
        </p>

        <div className="mt-9 rounded-[1.5rem] bg-[#f5f1e9] p-6">
          <p className="text-sm font-semibold text-[#26352a]">
            Hâlâ sorunuz mu var?
          </p>

          <p className="mt-2 text-sm leading-6 text-[#6f756e]">
            Size özel sorularınız için iletişim sayfasından bize
            ulaşabilirsiniz.
          </p>

          <a
            href="/iletisim"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#52624d] transition hover:text-[#26352a]"
          >
            İletişime geçin
            <span className="transition-transform duration-300 hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* FAQ LISTESİ */}

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-[1.5rem] border transition-all duration-300 ${
                isOpen
                  ? "border-[#71816a]/30 bg-[#f5f1e9] shadow-sm"
                  : "border-[#26352a]/10 bg-[#faf9f6] hover:border-[#71816a]/25 hover:bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-5 px-6 py-6 text-left sm:px-7"
              >
                {/* NUMARA */}

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                    isOpen
                      ? "bg-[#71816a] text-white"
                      : "bg-[#e4eadf] text-[#52624d]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* SORU */}

                <span className="flex-1 pr-2 text-base font-semibold leading-6 text-[#26352a] sm:text-lg">
                  {faq.question}
                </span>

                {/* PLUS */}

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl font-light transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-[#71816a] bg-[#71816a] text-white"
                      : "border-[#26352a]/10 bg-white text-[#71816a]"
                  }`}
                >
                  +
                </span>
              </button>

              {/* CEVAP */}

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-7 pl-[4.5rem] pr-7 sm:pl-[4.75rem]">
                    <div className="h-px bg-[#26352a]/10" />

                    <p className="pt-5 text-sm leading-7 text-[#6f756e] sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

);
}