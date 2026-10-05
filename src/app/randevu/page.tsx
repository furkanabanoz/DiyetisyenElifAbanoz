"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const appointmentTypes = [
  "Yüz yüze",
  "Online görüşme",
];

export default function AppointmentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    appointment_type: "Yüz yüze",
    preferred_date: "",
    preferred_time: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  /*
   * TARİHİN HAFTA SONU OLUP OLMADIĞINI KONTROL ET
   *
   * 0 = Pazar
   * 6 = Cumartesi
   */
  function isWeekend(dateString: string) {
    if (!dateString) {
      return false;
    }

    const date = new Date(`${dateString}T00:00:00`);
    const day = date.getDay();

    return day === 0 || day === 6;
  }

  /*
   * SAATİN ÇALIŞMA SAATLERİ İÇİNDE OLUP OLMADIĞINI KONTROL ET
   *
   * Çalışma saatleri:
   * 10:00 - 16:00
   */
  function isOutsideWorkingHours(timeString: string) {
    if (!timeString) {
      return false;
    }

    const [hour, minute] = timeString
      .split(":")
      .map(Number);

    const totalMinutes = hour * 60 + minute;

    const startMinutes = 10 * 60; // 10:00
    const endMinutes = 16 * 60; // 16:00

    return (
      totalMinutes < startMinutes ||
      totalMinutes >= endMinutes
    );
  }

  /*
   * TARİH DEĞİŞTİĞİNDE
   *
   * Hafta sonu seçilirse otomatik olarak
   * tarihi temizliyoruz.
   */
  function handleDateChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    setError("");
    setSuccess("");

    if (isWeekend(value)) {
      setForm((current) => ({
        ...current,
        preferred_date: "",
      }));

      setError(
        "Cumartesi ve pazar günleri randevu alınamamaktadır. Lütfen hafta içi bir gün seçin."
      );

      return;
    }

    setForm((current) => ({
      ...current,
      preferred_date: value,
    }));
  }

  /*
   * SAAT DEĞİŞTİĞİNDE
   */
  function handleTimeChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    setError("");
    setSuccess("");

    if (isOutsideWorkingHours(value)) {
      setForm((current) => ({
        ...current,
        preferred_time: "",
      }));

      setError(
        "Randevu saatleri 10:00 - 16:00 arasındadır. Lütfen uygun bir saat seçin."
      );

      return;
    }

    setForm((current) => ({
      ...current,
      preferred_time: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    // AD SOYAD
    if (!form.name.trim()) {
      setError("Lütfen ad soyad alanını doldurun.");
      setLoading(false);
      return;
    }

    // E-POSTA
    if (!form.email.trim()) {
      setError("Lütfen e-posta adresinizi girin.");
      setLoading(false);
      return;
    }

    // TELEFON
    if (!form.phone.trim()) {
      setError("Lütfen telefon numaranızı girin.");
      setLoading(false);
      return;
    }

    // TARİH
    if (!form.preferred_date) {
      setError("Lütfen tercih ettiğiniz tarihi seçin.");
      setLoading(false);
      return;
    }

    // SAAT
    if (!form.preferred_time) {
      setError("Lütfen tercih ettiğiniz saati seçin.");
      setLoading(false);
      return;
    }

    /*
     * TARİH KONTROLÜ
     */

    const today = new Date();

    const selectedDate = new Date(
      `${form.preferred_date}T00:00:00`
    );

    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (selectedDate < todayOnly) {
      setError(
        "Geçmiş bir tarih için randevu talebi oluşturamazsınız."
      );
      setLoading(false);
      return;
    }

    /*
     * HAFTA SONU KONTROLÜ
     *
     * Kullanıcı tarayıcıyı manipüle etse bile
     * burada tekrar kontrol ediyoruz.
     */

    if (isWeekend(form.preferred_date)) {
      setError(
        "Cumartesi ve pazar günleri randevu alınamamaktadır. Lütfen hafta içi bir gün seçin."
      );
      setLoading(false);
      return;
    }

    /*
     * ÇALIŞMA SAATİ KONTROLÜ
     *
     * 10:00 dahil
     * 16:00 ve sonrası yasak
     */

    if (isOutsideWorkingHours(form.preferred_time)) {
      setError(
        "Randevu saatleri 10:00 - 16:00 arasındadır. Lütfen uygun bir saat seçin."
      );
      setLoading(false);
      return;
    }

    // E-POSTA FORMAT KONTROLÜ
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      setError(
        "Lütfen geçerli bir e-posta adresi girin."
      );
      setLoading(false);
      return;
    }

    /*
     * AYNI TARİH + SAAT KONTROLÜ
     */

    const {
      data: existingAppointment,
      error: checkError,
    } = await supabase
      .from("appointment_requests")
      .select("id, status")
      .eq(
        "preferred_date",
        form.preferred_date
      )
      .eq(
        "preferred_time",
        form.preferred_time
      )
      .in("status", [
        "pending",
        "confirmed",
      ])
      .limit(1)
      .maybeSingle();

    if (checkError) {
      console.error(
        "Randevu uygunluğu kontrol edilemedi:",
        checkError
      );

      setError(
        "Randevu uygunluğu kontrol edilemedi. Lütfen tekrar deneyin."
      );

      setLoading(false);
      return;
    }

    if (existingAppointment) {
      setError(
        "Seçtiğiniz tarih ve saat için mevcut bir randevu talebi bulunuyor. Lütfen başka bir saat seçin."
      );

      setLoading(false);
      return;
    }

    /*
     * RANDEVU OLUŞTUR
     */

    const { error: insertError } =
      await supabase
        .from("appointment_requests")
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          appointment_type:
            form.appointment_type,
          preferred_date:
            form.preferred_date,
          preferred_time:
            form.preferred_time,
          note:
            form.note.trim() || null,
          status: "pending",
        });

    if (insertError) {
      console.error(
        "Randevu talebi gönderilemedi:",
        insertError
      );

      setError(
        "Randevu talebiniz gönderilemedi. Lütfen tekrar deneyin."
      );

      setLoading(false);
      return;
    }

    /*
     * BAŞARILI
     */

    setSuccess(
      "Randevu talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz."
    );

    /*
     * FORMU TEMİZLE
     */

    setForm({
      name: "",
      email: "",
      phone: "",
      appointment_type: "Yüz yüze",
      preferred_date: "",
      preferred_time: "",
      note: "",
    });

    setLoading(false);
  }

  /*
   * BUGÜNÜ YYYY-MM-DD FORMATINDA AL
   */

  const todayForInput =
    new Date().toISOString().split("T")[0];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#faf9f6] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">

            {/* SOL TARAF */}

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
                Randevu
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#26352a] sm:text-5xl">
                Sağlıklı yaşam yolculuğunuza başlayın.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6f756e]">
                Size uygun görüşme şeklini ve
                tercih ettiğiniz zamanı bize
                iletin. Randevu talebinizi
                aldıktan sonra sizinle iletişime
                geçerek kesinleştireceğiz.
              </p>

              <div className="mt-10 space-y-5">

                <div className="rounded-2xl bg-[#eef3eb] p-5">
                  <p className="font-medium text-[#26352a]">
                    📅 Randevu talebi
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#6f756e]">
                    Buradaki tarih ve saat
                    tercihiniz kesin randevu
                    anlamına gelmez. Uygunluk
                    kontrolünden sonra
                    randevunuz onaylanır.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-medium text-[#26352a]">
                    💬 Görüşme seçenekleri
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#6f756e]">
                    Yüz yüze veya online görüşme
                    seçeneklerinden size uygun
                    olanı seçebilirsiniz.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-medium text-[#26352a]">
                    🕐 Çalışma saatleri
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#6f756e]">
                    Hafta içi 10:00 - 16:00
                    saatleri arasında randevu
                    talebi oluşturabilirsiniz.
                    Cumartesi ve pazar günleri
                    hizmet verilmemektedir.
                  </p>
                </div>

              </div>
            </div>

            {/* FORM */}

            <div className="rounded-[2rem] bg-white p-7 shadow-sm sm:p-10">

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* AD SOYAD + E-POSTA */}

                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-[#26352a]"
                    >
                      Ad Soyad *
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#26352a]"
                    >
                      E-posta *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
                      placeholder="ornek@email.com"
                    />
                  </div>

                </div>

                {/* TELEFON */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-[#26352a]"
                  >
                    Telefon *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
                    placeholder="05xx xxx xx xx"
                  />
                </div>

                {/* GÖRÜŞME TÜRÜ */}

                <div>
                  <label
                    htmlFor="appointment_type"
                    className="mb-2 block text-sm font-medium text-[#26352a]"
                  >
                    Görüşme Şekli *
                  </label>

                  <select
                    id="appointment_type"
                    name="appointment_type"
                    value={form.appointment_type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
                  >
                    {appointmentTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* TARİH + SAAT */}

                <div className="grid gap-6 sm:grid-cols-2">

                  {/* TARİH */}

                  <div>
                    <label
                      htmlFor="preferred_date"
                      className="mb-2 block text-sm font-medium text-[#26352a]"
                    >
                      Tercih Edilen Tarih *
                    </label>

                    <input
                      id="preferred_date"
                      name="preferred_date"
                      type="date"
                      value={form.preferred_date}
                      onChange={handleDateChange}
                      min={todayForInput}
                      required
                      className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
                    />

                    <p className="mt-2 text-xs text-[#8a9089]">
                      Cumartesi ve pazar günleri kapalıdır.
                    </p>
                  </div>

                  {/* SAAT */}

                  <div>
                    <label
                      htmlFor="preferred_time"
                      className="mb-2 block text-sm font-medium text-[#26352a]"
                    >
                      Tercih Edilen Saat *
                    </label>

                    <input
                      id="preferred_time"
                      name="preferred_time"
                      type="time"
                      value={form.preferred_time}
                      onChange={handleTimeChange}
                      min="10:00"
                      max="15:59"
                      step="1800"
                      required
                      className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
                    />

                    <p className="mt-2 text-xs text-[#8a9089]">
                      Randevu saatleri: 10:00 - 16:00
                    </p>
                  </div>

                </div>

                {/* NOT */}

                <div>
                  <label
                    htmlFor="note"
                    className="mb-2 block text-sm font-medium text-[#26352a]"
                  >
                    Notunuz
                  </label>

                  <textarea
                    id="note"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
                    placeholder="Varsa belirtmek istediğiniz başka bir konu..."
                  />
                </div>

                {/* HATA */}

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* BAŞARI */}

                {success && (
                  <div
                    role="status"
                    className="rounded-xl bg-[#eef3eb] px-4 py-3 text-sm leading-6 text-[#52634f]"
                  >
                    {success}
                  </div>
                )}

                {/* GÖNDER */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#71816a] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#5f6f59] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Talep Gönderiliyor..."
                    : "Randevu Talebi Gönder"}
                </button>

                <p className="text-center text-xs leading-5 text-[#8a9089]">
                  Gönderdiğiniz bilgiler yalnızca
                  randevu talebinizi değerlendirmek
                  ve sizinle iletişime geçmek amacıyla
                  kullanılacaktır.
                </p>

              </form>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
