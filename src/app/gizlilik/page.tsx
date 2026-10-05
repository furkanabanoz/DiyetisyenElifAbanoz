import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
          Yasal Bilgilendirme
        </p>

        <h1 className="mt-4 text-4xl font-semibold text-[#26352a]">
          Gizlilik Politikası
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-8 text-[#596458]">
          <p>
            Kişisel bilgilerinizin gizliliğine
            önem veriyoruz.
          </p>

          <p>
            İletişim formu üzerinden
            gönderdiğiniz ad, e-posta, telefon
            ve mesaj bilgileriniz yalnızca
            iletişim taleplerinizi yanıtlamak
            amacıyla kullanılmaktadır.
          </p>

          <p>
            Kişisel verileriniz ilgili mevzuat
            çerçevesinde korunur ve gerekli
            güvenlik önlemleri uygulanır.
          </p>
        </div>
      </div>
    </main>
  );
}
