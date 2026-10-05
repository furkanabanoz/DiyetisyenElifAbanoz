import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
          Yardım
        </p>

        <h1 className="mt-4 text-4xl font-semibold text-[#26352a]">
          Sıkça Sorulan Sorular
        </h1>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#26352a]">
              Online danışmanlık yapıyor musunuz?
            </h2>

            <p className="mt-3 leading-7 text-[#596458]">
              Danışmanlık seçenekleri hakkında
              detaylı bilgi almak için iletişim
              formundan bize ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#26352a]">
              İlk görüşmede neler konuşulur?
            </h2>

            <p className="mt-3 leading-7 text-[#596458]">
              Beslenme alışkanlıklarınız,
              hedefleriniz ve günlük yaşam
              düzeniniz değerlendirilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#26352a]">
              Size nasıl ulaşabilirim?
            </h2>

            <p className="mt-3 leading-7 text-[#596458]">
              İletişim sayfasındaki form
              üzerinden bize mesaj
              gönderebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
