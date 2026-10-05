"use client";

import { useState } from "react";

type SiteSettings = {
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
};

type Props = {
  settings: SiteSettings | null;
};

export default function ContactSection({
  settings,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError(
        "Lütfen ad, e-posta ve mesaj alanlarını doldurun."
      );

      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          subject: form.subject.trim() || null,
          message: form.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Mesajınız gönderilemedi."
        );
      }

      setSuccess(
        "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (submitError) {
      console.error(
        "Mesaj gönderilemedi:",
        submitError
      );

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Mesajınız gönderilemedi. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  }

  function getWhatsAppUrl() {
    const number =
      settings?.whatsapp ||
      settings?.phone ||
      "";

    const cleanNumber =
      number.replace(/\D/g, "");

    if (!cleanNumber) {
      return null;
    }

    return `https://wa.me/${cleanNumber}`;
  }

  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      id="iletisim"
      className="relative overflow-hidden bg-[#f5f1e9] px-6 py-24 lg:py-32"
    >
      {/* DEKORATİF ARKA PLAN */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#dce4d5]/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#e9ddce]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* ÜST BAŞLIK */}

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#d8ded5] bg-white/60 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#71816a]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816a]">
              İletişim
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-semibold leading-[1.08] tracking-tight text-[#26352a] sm:text-6xl lg:text-7xl">
            Birlikte daha sağlıklı
            <span className="block text-[#71816a]">
              bir başlangıç yapalım.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6f756e] sm:text-xl">
            Beslenme danışmanlığı hakkında bilgi
            almak, merak ettiklerinizi sormak veya
            randevu süreci hakkında konuşmak için
            benimle iletişime geçebilirsiniz.
          </p>
        </div>

        {/* ANA ALAN */}

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">

          {/* SOL BİLGİLER */}

          <div className="rounded-[2.5rem] bg-[#26352a] p-8 text-white sm:p-10 lg:p-12">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b8c5b2]">
              İletişim Bilgileri
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
              Size nasıl
              <span className="block text-[#b8c5b2]">
                yardımcı olabilirim?
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-[#d2d9d0]">
              Size uygun danışmanlık sürecini
              birlikte değerlendirebilir ve
              sorularınızı yanıtlayabilirim.
            </p>

            <div className="mt-10 space-y-4">

              {/* TELEFON */}

              {settings?.phone && (
                <a
                  href={`tel:${settings.phone.replace(
                    /\s/g,
                    ""
                  )}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#71816a]">
                    <span className="text-lg">
                      ☎
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#9eaa9a]">
                      Telefon
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      {settings.phone}
                    </p>
                  </div>

                  <span className="ml-auto text-lg text-[#9eaa9a] transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
              )}

              {/* E-POSTA */}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#71816a]">
                    <span className="text-lg">
                      @
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#9eaa9a]">
                      E-posta
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-white">
                      {settings.email}
                    </p>
                  </div>

                  <span className="ml-auto text-lg text-[#9eaa9a] transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
              )}

              {/* WHATSAPP */}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#71816a]">
                    <span className="text-lg">
                      W
                    </span>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#9eaa9a]">
                      WhatsApp
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Hızlıca mesaj gönderin
                    </p>
                  </div>

                  <span className="ml-auto text-lg text-[#9eaa9a] transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
              )}

              {/* ADRES */}

              {settings?.address && (
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#71816a]">
                    <span className="text-lg">
                      📍
                    </span>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#9eaa9a]">
                      Adres
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white">
                      {settings.address}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* SOSYAL */}

            {(settings?.instagram_url ||
              settings?.facebook_url ||
              settings?.youtube_url) && (
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-xs uppercase tracking-[0.15em] text-[#9eaa9a]">
                  Sosyal Medya
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {settings.instagram_url && (
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-[#d8ded6] transition hover:bg-white/10"
                    >
                      Instagram
                    </a>
                  )}

                  {settings.facebook_url && (
                    <a
                      href={settings.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-[#d8ded6] transition hover:bg-white/10"
                    >
                      Facebook
                    </a>
                  )}

                  {settings.youtube_url && (
                    <a
                      href={settings.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-[#d8ded6] transition hover:bg-white/10"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* FORM */}

          <div className="rounded-[2.5rem] border border-[#e2e6df] bg-white p-7 shadow-[0_20px_60px_rgba(38,53,42,0.07)] sm:p-10 lg:p-12">

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#71816a]">
                Mesaj Gönder
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#26352a] sm:text-4xl">
                Size ulaşalım.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#7a8179]">
                Formu doldurarak mesajınızı
                iletebilirsiniz. En kısa sürede
                sizinle iletişime geçeceğiz.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-9 space-y-6"
            >
              {/* AD + EPOSTA */}

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#26352a]"
                  >
                    Ad Soyad
                    <span className="ml-1 text-[#71816a]">
                      *
                    </span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3.5 text-sm text-[#26352a] outline-none transition placeholder:text-[#a0a69f] focus:border-[#71816a] focus:bg-white focus:ring-4 focus:ring-[#71816a]/10"
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#26352a]"
                  >
                    E-posta
                    <span className="ml-1 text-[#71816a]">
                      *
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3.5 text-sm text-[#26352a] outline-none transition placeholder:text-[#a0a69f] focus:border-[#71816a] focus:bg-white focus:ring-4 focus:ring-[#71816a]/10"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              {/* TELEFON + KONU */}

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-[#26352a]"
                  >
                    Telefon
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="w-full rounded-xl border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3.5 text-sm text-[#26352a] outline-none transition placeholder:text-[#a0a69f] focus:border-[#71816a] focus:bg-white focus:ring-4 focus:ring-[#71816a]/10"
                    placeholder="05xx xxx xx xx"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-[#26352a]"
                  >
                    Konu
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3.5 text-sm text-[#26352a] outline-none transition placeholder:text-[#a0a69f] focus:border-[#71816a] focus:bg-white focus:ring-4 focus:ring-[#71816a]/10"
                    placeholder="Size nasıl yardımcı olabiliriz?"
                  />
                </div>
              </div>

              {/* MESAJ */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#26352a]"
                  >
                    Mesajınız
                    <span className="ml-1 text-[#71816a]">
                      *
                    </span>
                  </label>

                  <span className="text-xs text-[#9aa098]">
                    Zorunlu
                  </span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  className="w-full resize-none rounded-xl border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3.5 text-sm leading-7 text-[#26352a] outline-none transition placeholder:text-[#a0a69f] focus:border-[#71816a] focus:bg-white focus:ring-4 focus:ring-[#71816a]/10"
                  placeholder="Mesajınızı buraya yazabilirsiniz..."
                />
              </div>

              {/* HATA */}

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-700"
                >
                  <span className="mt-0.5">
                    !
                  </span>

                  <span>{error}</span>
                </div>
              )}

              {/* BAŞARI */}

              {success && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-2xl border border-[#d6e2d2] bg-[#eef3eb] px-4 py-4 text-sm leading-6 text-[#52634f]"
                >
                  <span className="mt-0.5 font-semibold">
                    ✓
                  </span>

                  <span>{success}</span>
                </div>
              )}

              {/* GÖNDER */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center rounded-xl bg-[#71816a] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#5f6f59] hover:shadow-xl hover:shadow-[#71816a]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Mesaj Gönder

                    <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-[#9aa098]">
                Gönderdiğiniz bilgiler yalnızca
                iletişim talebinize dönüş yapmak
                amacıyla kullanılacaktır.
              </p>
            </form>
          </div>
        </div>

        {/* ALT CTA */}

        <div className="mt-8 rounded-[2.5rem] border border-[#dfe4dc] bg-white/70 p-8 text-center backdrop-blur sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#71816a]">
            Bir sonraki adım
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#26352a] sm:text-3xl">
            Randevu almak ister misiniz?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#737a73]">
            İletişim formunu doldurmak yerine
            doğrudan randevu talebi de
            oluşturabilirsiniz.
          </p>

          <a
            href="/randevu"
            className="mt-6 inline-flex items-center rounded-xl bg-[#26352a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#344638] hover:shadow-lg"
          >
            Randevu Oluştur

            <span className="ml-3">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
