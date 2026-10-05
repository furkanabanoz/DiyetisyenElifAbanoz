const steps = [
  {
    number: "01",
    title: "Randevunuzu oluşturun",
    text: "Size uygun görüşme seçeneğini belirleyerek ilk adımı atın.",
  },
  {
    number: "02",
    title: "İlk görüşmemizi yapalım",
    text: "Hedeflerinizi, ihtiyaçlarınızı ve mevcut beslenme düzeninizi birlikte değerlendirelim.",
  },
  {
    number: "03",
    title: "Size özel yaklaşımı oluşturalım",
    text: "Günlük hayatınıza uyum sağlayabilecek kişisel bir beslenme planı oluşturalım.",
  },
  {
    number: "04",
    title: "Süreci birlikte takip edelim",
    text: "Düzenli kontrollerle süreci değerlendirelim ve gerektiğinde planı güncelleyelim.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-[#26352a] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b9c7b2]">
            Süreç
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            İlk adımdan itibaren yanınızdayım.
          </h2>
        </div>

        <div className="mt-16 grid gap-0 border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border-b border-white/15 p-8 md:border-r md:last:border-r-0 lg:border-b-0"
            >
              <span className="text-sm font-medium text-[#b9c7b2]">
                {step.number}
              </span>

              <h3 className="mt-12 text-xl font-semibold">{step.title}</h3>

              <p className="mt-4 text-sm leading-7 text-white/60">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}