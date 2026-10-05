"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Service = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  price: number | string | null;
  features: unknown;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
};

type Props = {
  services: Service[];
};

type FormState = {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  price: string;
  features: string;
  seo_title: string;
  seo_description: string;
  is_active: boolean;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  short_description: "",
  description: "",
  icon: "",
  price: "",
  features: "",
  seo_title: "",
  seo_description: "",
  is_active: true,
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function featuresToText(features: unknown) {
  if (!features) {
    return "";
  }

  if (Array.isArray(features)) {
    return features
      .map((item) => String(item))
      .join("\n");
  }

  if (typeof features === "string") {
    try {
      const parsed = JSON.parse(features);

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => String(item))
          .join("\n");
      }
    } catch {
      return features;
    }

    return features;
  }

  return "";
}

export default function ServicesManager({
  services: initialServices,
}: Props) {
  const [services, setServices] =
    useState<Service[]>(initialServices);

  const [form, setForm] =
    useState<FormState>(emptyForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [showForm, setShowForm] =
    useState(false);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
    setMessage("");
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setMessage("");
  }

  function handleActiveChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((current) => ({
      ...current,
      is_active: e.target.checked,
    }));
  }

  function startNewService() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
    setMessage("");
  }

  function startEdit(service: Service) {
    setEditingId(service.id);

    setForm({
      title: service.title ?? "",
      slug: service.slug ?? "",
      short_description:
        service.short_description ?? "",
      description: service.description ?? "",
      icon: service.icon ?? "",
      price:
        service.price !== null &&
        service.price !== undefined
          ? String(service.price)
          : "",
      features: featuresToText(service.features),
      seo_title: service.seo_title ?? "",
      seo_description:
        service.seo_description ?? "",
      is_active: service.is_active,
    });

    setShowForm(true);
    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleTitleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    setForm((current) => ({
      ...current,
      title: value,
      slug: editingId
        ? current.slug
        : createSlug(value),
    }));

    setError("");
    setMessage("");
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!form.title.trim()) {
        throw new Error(
          "Hizmet başlığı zorunludur."
        );
      }

      if (!form.slug.trim()) {
        throw new Error(
          "Slug alanı zorunludur."
        );
      }

      const features = form.features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        short_description:
          form.short_description.trim() || null,
        description:
          form.description.trim() || null,
        icon: form.icon.trim() || null,
        price: form.price.trim()
          ? Number(form.price)
          : null,
        features,
        seo_title:
          form.seo_title.trim() || null,
        seo_description:
          form.seo_description.trim() || null,
        is_active: form.is_active,
        updated_at: new Date().toISOString(),
      };

      if (
        form.price.trim() &&
        Number.isNaN(Number(form.price))
      ) {
        throw new Error(
          "Fiyat alanına geçerli bir sayı girin."
        );
      }

      if (editingId) {
        const { data, error: updateError } =
          await supabase
            .from("services")
            .update(payload)
            .eq("id", editingId)
            .select()
            .single();

        if (updateError) {
          console.error(updateError);

          throw new Error(
            "Hizmet güncellenemedi."
          );
        }

        setServices((current) =>
          current.map((service) =>
            service.id === editingId
              ? data
              : service
          )
        );

        setMessage(
          "Hizmet başarıyla güncellendi."
        );
      } else {
        const { data, error: insertError } =
          await supabase
            .from("services")
            .insert(payload)
            .select()
            .single();

        if (insertError) {
          console.error(insertError);

          if (
            insertError.code === "23505"
          ) {
            throw new Error(
              "Bu slug zaten kullanılıyor. Farklı bir slug girin."
            );
          }

          throw new Error(
            "Hizmet eklenemedi."
          );
        }

        setServices((current) => [
          ...current,
          data,
        ]);

        setMessage(
          "Yeni hizmet başarıyla eklendi."
        );
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (submitError) {
      console.error(
        "Hizmet kayıt hatası:",
        submitError
      );

      setError(
        submitError instanceof Error
          ? submitError.message
          : "İşlem sırasında bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    service: Service
  ) {
    const confirmed = window.confirm(
      `"${service.title}" hizmetini silmek istediğinize emin misiniz?`
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    const { error: deleteError } =
      await supabase
        .from("services")
        .delete()
        .eq("id", service.id);

    if (deleteError) {
      console.error(deleteError);

      setError(
        "Hizmet silinemedi."
      );

      return;
    }

    setServices((current) =>
      current.filter(
        (item) => item.id !== service.id
      )
    );

    if (editingId === service.id) {
      resetForm();
    }

    setMessage(
      "Hizmet başarıyla silindi."
    );
  }

  async function toggleActive(
    service: Service
  ) {
    setError("");
    setMessage("");

    const newStatus =
      !service.is_active;

    const { error: updateError } =
      await supabase
        .from("services")
        .update({
          is_active: newStatus,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", service.id);

    if (updateError) {
      console.error(updateError);

      setError(
        "Hizmet durumu değiştirilemedi."
      );

      return;
    }

    setServices((current) =>
      current.map((item) =>
        item.id === service.id
          ? {
              ...item,
              is_active: newStatus,
            }
          : item
      )
    );

    setMessage(
      newStatus
        ? "Hizmet aktif hale getirildi."
        : "Hizmet pasif hale getirildi."
    );
  }

  return (
    <div className="space-y-8">
      {/* ÜST BAR */}

      <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[#6f756e]">
            Toplam hizmet
          </p>

          <p className="mt-1 text-3xl font-semibold text-[#26352a]">
            {services.length}
          </p>
        </div>

        <button
          type="button"
          onClick={startNewService}
          className="rounded-xl bg-[#71816a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#5f6f59]"
        >
          + Yeni Hizmet Ekle
        </button>
      </div>

      {/* MESAJLAR */}

      {error && (
        <div className="rounded-xl bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-xl bg-[#eef3eb] px-5 py-4 text-sm text-[#52634f]">
          {message}
        </div>
      )}

      {/* FORM */}

      {showForm && (
        <section className="rounded-[2rem] bg-white p-7 shadow-sm sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#26352a]">
                {editingId
                  ? "Hizmeti Düzenle"
                  : "Yeni Hizmet"}
              </h2>

              <p className="mt-2 text-sm text-[#6f756e]">
                Hizmet bilgileriniz burada
                düzenleyebilirsiniz.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-[#dfe3dc] px-4 py-2 text-sm text-[#596458] hover:bg-[#faf9f6]"
            >
              Kapat
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* BAŞLIK / SLUG */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#26352a]">
                  Hizmet Adı
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Kilo Yönetimi"
                  className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none focus:border-[#71816a]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#26352a]">
                  Slug
                </label>

                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="kilo-yonetimi"
                  className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none focus:border-[#71816a]"
                />
              </div>
            </div>

            {/* KISA AÇIKLAMA */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#26352a]">
                Kısa Açıklama
              </label>

              <textarea
                name="short_description"
                value={form.short_description}
                onChange={handleChange}
                rows={3}
                placeholder="Hizmet kartında gösterilecek kısa açıklama..."
                className="w-full resize-none rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none focus:border-[#71816a]"
              />
            </div>

            {/* AÇIKLAMA */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#26352a]">
                Detaylı Açıklama
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="Hizmet hakkında detaylı açıklama..."
                className="w-full resize-none rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none focus:border-[#71816a]"
              />
            </div>

            {/* İKON / FİYAT */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#26352a]">
                  İkon
                </label>

                <input
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  placeholder="heart"
                  className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none focus:border-[#71816a]"
                />

                <p className="mt-2 text-xs text-[#8a9089]">
                  Örneğin: heart, activity,
                  scale
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#26352a]">
                  Fiyat
                </label>

                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  placeholder="1500"
                  className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none focus:border-[#71816a]"
                />
              </div>
            </div>

            {/* ÖZELLİKLER */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#26352a]">
                Özellikler
              </label>

              <textarea
                name="features"
                value={form.features}
                onChange={handleChange}
                rows={6}
                placeholder={`Kişiye özel beslenme programı
Düzenli takip ve değerlendirme
WhatsApp üzerinden iletişim`}
                className="w-full resize-none rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 outline-none focus:border-[#71816a]"
              />

              <p className="mt-2 text-xs text-[#8a9089]">
                Her özelliği ayrı bir satıra
                yazın.
              </p>
            </div>

            {/* SEO */}

            <div className="rounded-2xl bg-[#faf9f6] p-5">
              <h3 className="text-lg font-semibold text-[#26352a]">
                SEO
              </h3>

              <div className="mt-5 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26352a]">
                    SEO Başlığı
                  </label>

                  <input
                    name="seo_title"
                    value={form.seo_title}
                    onChange={handleChange}
                    placeholder="Kilo Yönetimi | Diyetisyen..."
                    className="w-full rounded-xl border border-[#dfe3dc] bg-white px-4 py-3 outline-none focus:border-[#71816a]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26352a]">
                    SEO Açıklaması
                  </label>

                  <textarea
                    name="seo_description"
                    value={form.seo_description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-[#dfe3dc] bg-white px-4 py-3 outline-none focus:border-[#71816a]"
                  />
                </div>
              </div>
            </div>

            {/* AKTİF */}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#dfe3dc] bg-[#faf9f6] p-4">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={handleActiveChange}
                className="h-5 w-5 accent-[#71816a]"
              />

              <span>
                <span className="block text-sm font-medium text-[#26352a]">
                  Hizmet aktif
                </span>

                <span className="block text-xs text-[#8a9089]">
                  Pasif hizmetler web sitesinde
                  gösterilmez.
                </span>
              </span>
            </label>

            {/* BUTONLAR */}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#dfe3dc] px-6 py-3 text-sm font-medium text-[#596458] hover:bg-[#faf9f6]"
              >
                Vazgeç
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#71816a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#5f6f59] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Kaydediliyor..."
                  : editingId
                    ? "Değişiklikleri Kaydet"
                    : "Hizmeti Ekle"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* HİZMET LİSTESİ */}

      <section className="space-y-4">
        {services.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-[#26352a]">
              Henüz hizmet yok.
            </h2>

            <p className="mt-3 text-[#6f756e]">
              İlk hizmetinizi eklemek için
              yukarıdaki butonu kullanın.
            </p>
          </div>
        ) : (
          services.map((service, index) => (
            <article
              key={service.id}
              className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef3eb] text-sm font-medium text-[#71816a]">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <h2 className="truncate text-xl font-semibold text-[#26352a]">
                      {service.title}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        service.is_active
                          ? "bg-[#eef3eb] text-[#52634f]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {service.is_active
                        ? "Aktif"
                        : "Pasif"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[#8a9089]">
                    /{service.slug}
                  </p>

                  {service.short_description && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f756e]">
                      {service.short_description}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      toggleActive(service)
                    }
                    className="rounded-xl border border-[#dfe3dc] px-4 py-2.5 text-sm font-medium text-[#596458] transition hover:bg-[#faf9f6]"
                  >
                    {service.is_active
                      ? "Pasifleştir"
                      : "Aktifleştir"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      startEdit(service)
                    }
                    className="rounded-xl bg-[#71816a] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#5f6f59]"
                  >
                    Düzenle
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(service)
                    }
                    className="rounded-xl bg-red-50 px-5 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
