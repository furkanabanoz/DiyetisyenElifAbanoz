"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Settings = {
  id?: string;

  site_name?: string | null;
  description?: string | null;

  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;

  instagram_url?: string | null;
  facebook_url?: string | null;
  youtube_url?: string | null;

  address?: string | null;

  logo_url?: string | null;
  favicon_url?: string | null;

  hero_title?: string | null;
  hero_description?: string | null;
  hero_image_url?: string | null;

  /* HAKKIMDA */

  about_badge?: string | null;
  about_title?: string | null;
  about_description_1?: string | null;
  about_description_2?: string | null;
  about_card_title?: string | null;
  about_text_1?: string | null;
  about_text_2?: string | null;
  about_image_url?: string | null;

  /* HEADER */

  header_badge?: string | null;
  header_title?: string | null;
  header_logo_url?: string | null;

  updated_at?: string | null;
};

type Props = {
  settings: Settings | null;
};

type ImageField =
  | "logo_url"
  | "favicon_url"
  | "hero_image_url"
  | "about_image_url"
  | "header_logo_url";

type FormState = {
  site_name: string;
  description: string;

  phone: string;
  whatsapp: string;
  email: string;

  instagram_url: string;
  facebook_url: string;
  youtube_url: string;

  address: string;

  logo_url: string;
  favicon_url: string;

  hero_title: string;
  hero_description: string;
  hero_image_url: string;

  /* HAKKIMDA */

  about_badge: string;
  about_title: string;
  about_description_1: string;
  about_description_2: string;
  about_card_title: string;
  about_text_1: string;
  about_text_2: string;
  about_image_url: string;

  /* HEADER */

  header_badge: string;
  header_title: string;
  header_logo_url: string;
};

function createFormState(
  settings: Settings | null
): FormState {
  return {
    site_name: settings?.site_name ?? "",
    description: settings?.description ?? "",

    phone: settings?.phone ?? "",
    whatsapp: settings?.whatsapp ?? "",
    email: settings?.email ?? "",

    instagram_url: settings?.instagram_url ?? "",
    facebook_url: settings?.facebook_url ?? "",
    youtube_url: settings?.youtube_url ?? "",

    address: settings?.address ?? "",

    logo_url: settings?.logo_url ?? "",
    favicon_url: settings?.favicon_url ?? "",

    hero_title: settings?.hero_title ?? "",
    hero_description: settings?.hero_description ?? "",
    hero_image_url: settings?.hero_image_url ?? "",

    /* HAKKIMDA */

    about_badge:
      settings?.about_badge ?? "Hakkımda",

    about_title:
      settings?.about_title ??
      "Beslenme sadece ne yediğimizden ibaret değil.",

    about_description_1:
      settings?.about_description_1 ??
      "Amacım, beslenme konusunda kendinizi daha iyi hissetmenizi sağlayacak sürdürülebilir alışkanlıklar oluşturmanıza yardımcı olmak.",

    about_description_2:
      settings?.about_description_2 ?? "",

    about_card_title:
      settings?.about_card_title ??
      "İsim Soyisim",

    about_text_1:
      settings?.about_text_1 ??
      "Buraya diyetisyenin gerçek biyografisi gelecek.",

    about_text_2:
      settings?.about_text_2 ??
      "Eğitim geçmişi, uzmanlık alanları, mesleki yaklaşımı ve danışanlarına bakış açısı burada detaylı şekilde anlatılacak.",

    about_image_url:
      settings?.about_image_url ?? "",

    /* HEADER */

    header_badge:
      settings?.header_badge ?? "DİYETİSYEN",

    header_title:
      settings?.header_title ??
      "Beslenme Danışmanlığı",

    header_logo_url:
      settings?.header_logo_url ?? "",
  };
}

const inputClass =
  "w-full rounded-xl border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3 text-sm text-[#26352a] outline-none transition placeholder:text-[#a0a69f] focus:border-[#71816a] focus:bg-white focus:ring-4 focus:ring-[#71816a]/10";

const textareaClass =
  "w-full resize-none rounded-xl border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3 text-sm leading-6 text-[#26352a] outline-none transition placeholder:text-[#a0a69f] focus:border-[#71816a] focus:bg-white focus:ring-4 focus:ring-[#71816a]/10";

const sectionClass =
  "overflow-hidden rounded-[1.75rem] border border-[#e4e8e1] bg-white shadow-[0_8px_30px_rgba(38,53,42,0.04)]";

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-[#edf0eb] px-6 py-5 sm:px-8">
      <h2 className="text-xl font-semibold tracking-tight text-[#26352a]">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 text-sm leading-6 text-[#7a8179]">
          {description}
        </p>
      )}
    </div>
  );
}

export default function SettingsForm({
  settings,
}: Props) {
  const [form, setForm] = useState<FormState>(
    createFormState(settings)
  );

  const [currentSettingsId, setCurrentSettingsId] =
    useState<string | null>(settings?.id ?? null);

  const [loading, setLoading] = useState(false);

  const [uploadingImage, setUploadingImage] =
    useState<ImageField | null>(null);

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

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: ImageField,
    folder: string
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingImage(field);
    setError("");
    setSuccess("");

    try {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
        "image/x-icon",
        "image/vnd.microsoft.icon",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "JPG, PNG, WebP, SVG veya ICO dosyası seçebilirsiniz."
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error(
          "Görsel boyutu en fazla 10 MB olabilir."
        );
      }

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${field}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${extension}`;

      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from("blog-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

      if (uploadError) {
        console.error(uploadError);

        throw new Error(
          uploadError.message ||
            "Görsel yüklenemedi."
        );
      }

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
        throw new Error(
          "Görsel yüklendi fakat URL alınamadı."
        );
      }

      setForm((current) => ({
        ...current,
        [field]: data.publicUrl,
      }));

      setSuccess(
        "Görsel yüklendi. Kalıcı hale getirmek için Ayarları Kaydet butonuna basın."
      );
    } catch (uploadError) {
      console.error(uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Görsel yüklenirken bir hata oluştu."
      );
    } finally {
      setUploadingImage(null);
      e.target.value = "";
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading || uploadingImage) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        site_name: form.site_name.trim(),
        description: form.description.trim(),

        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        email: form.email.trim(),

        instagram_url: form.instagram_url.trim(),
        facebook_url: form.facebook_url.trim(),
        youtube_url: form.youtube_url.trim(),

        address: form.address.trim(),

        logo_url: form.logo_url.trim(),
        favicon_url: form.favicon_url.trim(),

        hero_title: form.hero_title.trim(),
        hero_description: form.hero_description.trim(),
        hero_image_url: form.hero_image_url.trim(),

        /* HAKKIMDA */

        about_badge: form.about_badge.trim(),
        about_title: form.about_title.trim(),
        about_description_1:
          form.about_description_1.trim(),
        about_description_2:
          form.about_description_2.trim(),
        about_card_title:
          form.about_card_title.trim(),
        about_text_1:
          form.about_text_1.trim(),
        about_text_2:
          form.about_text_2.trim(),
        about_image_url:
          form.about_image_url.trim(),

        /* HEADER */

        header_badge:
          form.header_badge.trim(),
        header_title:
          form.header_title.trim(),
        header_logo_url:
          form.header_logo_url.trim(),

        updated_at:
          new Date().toISOString(),
      };

      /*
       * MEVCUT KAYIT VARSA GÜNCELLE
       */

      if (currentSettingsId) {
        const {
          data,
          error: updateError,
        } = await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", currentSettingsId)
          .select()
          .single();

        if (updateError) {
          throw new Error(
            updateError.message ||
              "Site ayarları güncellenemedi."
          );
        }

        if (!data) {
          throw new Error(
            "Ayar kaydı bulunamadı."
          );
        }

        setCurrentSettingsId(data.id);

        setSuccess(
          "Site ayarları başarıyla güncellendi."
        );

        return;
      }

      /*
       * KAYIT YOKSA YENİ OLUŞTUR
       */

      const {
        data,
        error: insertError,
      } = await supabase
        .from("site_settings")
        .insert(payload)
        .select()
        .single();

      if (insertError) {
        throw new Error(
          insertError.message ||
            "Site ayarları kaydedilemedi."
        );
      }

      if (!data) {
        throw new Error(
          "Ayarlar kaydedildi ancak kayıt bilgisi alınamadı."
        );
      }

      setCurrentSettingsId(data.id);

      setSuccess(
        "Site ayarları başarıyla kaydedildi."
      );
    } catch (submitError) {
      console.error(submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Ayarlar kaydedilirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  const isUploading =
    uploadingImage !== null;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =========================================
          ÜST ÖZET
      ========================================= */}

      <div className="rounded-[1.75rem] border border-[#e4e8e1] bg-white p-6 shadow-[0_8px_30px_rgba(38,53,42,0.04)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#71816a]">
              Yönetim Paneli
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#26352a]">
              Site Ayarları
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747b74]">
              Web sitenizde görünen temel bilgileri,
              iletişim bilgilerini, ana sayfayı ve
              Hakkımda sayfasını buradan yönetin.
            </p>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef3eb] text-2xl">
            ⚙️
          </div>

        </div>
      </div>

      {/* =========================================
          GENEL BİLGİLER
      ========================================= */}

      <section className={sectionClass}>

        <SectionHeader
          title="Genel Bilgiler"
          description="Sitenizin temel bilgilerini yönetin."
        />

        <div className="grid gap-6 p-6 sm:p-8">

          <div>
            <label
              htmlFor="site_name"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Site Adı
            </label>

            <input
              id="site_name"
              name="site_name"
              value={form.site_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Diyetisyen Elif Abanoz"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Site Açıklaması
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={textareaClass}
              placeholder="Siteniz hakkında kısa açıklama..."
            />
          </div>

        </div>
      </section>

      {/* =========================================
          HEADER
      ========================================= */}

      <section className={sectionClass}>

        <SectionHeader
          title="Navbar / Header"
          description="Sitenin üst kısmında görünen marka bilgilerini yönetin."
        />

        <div className="grid gap-6 p-6 sm:p-8">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label
                htmlFor="header_badge"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                Üst Yazı
              </label>

              <input
                id="header_badge"
                name="header_badge"
                value={form.header_badge}
                onChange={handleChange}
                className={inputClass}
                placeholder="DİYETİSYEN"
              />
            </div>

            <div>
              <label
                htmlFor="header_title"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                Ana Yazı
              </label>

              <input
                id="header_title"
                name="header_title"
                value={form.header_title}
                onChange={handleChange}
                className={inputClass}
                placeholder="Beslenme Danışmanlığı"
              />
            </div>

          </div>

          <ImageUpload
            label="Navbar Logosu"
            value={form.header_logo_url}
            field="header_logo_url"
            folder="site/header"
            uploadingImage={uploadingImage}
            isUploading={isUploading}
            loading={loading}
            onUpload={handleImageUpload}
          />

        </div>
      </section>

      {/* =========================================
          İLETİŞİM
      ========================================= */}

      <section className={sectionClass}>

        <SectionHeader
          title="İletişim Bilgileri"
          description="Ziyaretçilerin sizinle iletişim kurabilmesi için bilgilerinizi girin."
        />

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">

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
              value={form.phone}
              onChange={handleChange}
              type="tel"
              className={inputClass}
              placeholder="05xx xxx xx xx"
            />
          </div>

          <div>
            <label
              htmlFor="whatsapp"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              WhatsApp
            </label>

            <input
              id="whatsapp"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              type="tel"
              className={inputClass}
              placeholder="905xxxxxxxxx"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              E-posta
            </label>

            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className={inputClass}
              placeholder="info@site.com"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Adres
            </label>

            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={inputClass}
              placeholder="Adres bilgisi"
            />
          </div>

        </div>
      </section>

      {/* =========================================
          SOSYAL MEDYA
      ========================================= */}

      <section className={sectionClass}>

        <SectionHeader
          title="Sosyal Medya"
          description="Sosyal medya hesaplarınızın bağlantılarını yönetin."
        />

        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3">

          <div>
            <label
              htmlFor="instagram_url"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Instagram
            </label>

            <input
              id="instagram_url"
              name="instagram_url"
              value={form.instagram_url}
              onChange={handleChange}
              type="url"
              className={inputClass}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label
              htmlFor="facebook_url"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Facebook
            </label>

            <input
              id="facebook_url"
              name="facebook_url"
              value={form.facebook_url}
              onChange={handleChange}
              type="url"
              className={inputClass}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label
              htmlFor="youtube_url"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              YouTube
            </label>

            <input
              id="youtube_url"
              name="youtube_url"
              value={form.youtube_url}
              onChange={handleChange}
              type="url"
              className={inputClass}
              placeholder="https://youtube.com/..."
            />
          </div>

        </div>
      </section>

      {/* =========================================
          ANA SAYFA
      ========================================= */}

      <section className={sectionClass}>

        <SectionHeader
          title="Ana Sayfa"
          description="Ana sayfanızdaki hero alanını yönetin."
        />

        <div className="grid gap-6 p-6 sm:p-8">

          <div>
            <label
              htmlFor="hero_title"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Hero Başlığı
            </label>

            <input
              id="hero_title"
              name="hero_title"
              value={form.hero_title}
              onChange={handleChange}
              className={inputClass}
              placeholder="Sağlıklı yaşam için doğru beslenme"
            />
          </div>

          <div>
            <label
              htmlFor="hero_description"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Hero Açıklaması
            </label>

            <textarea
              id="hero_description"
              name="hero_description"
              value={form.hero_description}
              onChange={handleChange}
              rows={4}
              className={textareaClass}
              placeholder="Ana sayfada başlığın altında görünecek açıklama..."
            />
          </div>

          <ImageUpload
            label="Hero Fotoğrafı"
            value={form.hero_image_url}
            field="hero_image_url"
            folder="site/hero"
            uploadingImage={uploadingImage}
            isUploading={isUploading}
            loading={loading}
            onUpload={handleImageUpload}
            largePreview
          />

        </div>
      </section>

      {/* =========================================
          HAKKIMDA
      ========================================= */}

      <section className={sectionClass}>

        <SectionHeader
          title="Hakkımda Sayfası"
          description="Hakkımda sayfasında görünen tüm metinleri ve fotoğrafı buradan yönetin."
        />

        <div className="grid gap-8 p-6 sm:p-8">

          {/* ÜST YAZI */}

          <div>
            <label
              htmlFor="about_badge"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Üst Yazı
            </label>

            <input
              id="about_badge"
              name="about_badge"
              value={form.about_badge}
              onChange={handleChange}
              className={inputClass}
              placeholder="Hakkımda"
            />

            <p className="mt-2 text-xs text-[#8a9089]">
              Hakkımda sayfasının en üstünde küçük yazı olarak görünür.
            </p>
          </div>

          {/* ANA BAŞLIK */}

          <div>
            <label
              htmlFor="about_title"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Ana Başlık
            </label>

            <textarea
              id="about_title"
              name="about_title"
              value={form.about_title}
              onChange={handleChange}
              rows={3}
              className={textareaClass}
              placeholder="Beslenme sadece ne yediğimizden ibaret değil."
            />

            <p className="mt-2 text-xs text-[#8a9089]">
              Hakkımda sayfasının en büyük başlığıdır.
            </p>
          </div>

          {/* HERO AÇIKLAMA 1 */}

          <div>
            <label
              htmlFor="about_description_1"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Giriş Açıklaması
            </label>

            <textarea
              id="about_description_1"
              name="about_description_1"
              value={form.about_description_1}
              onChange={handleChange}
              rows={4}
              className={textareaClass}
              placeholder="Amacım, beslenme konusunda..."
            />
          </div>

          {/* HERO AÇIKLAMA 2 */}

          <div>
            <label
              htmlFor="about_description_2"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Ek Açıklama
            </label>

            <textarea
              id="about_description_2"
              name="about_description_2"
              value={form.about_description_2}
              onChange={handleChange}
              rows={4}
              className={textareaClass}
              placeholder="İsterseniz burada ikinci bir açıklama kullanabilirsiniz."
            />
          </div>

          {/* İSİM */}

          <div>
            <label
              htmlFor="about_card_title"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              İsim / Başlık
            </label>

            <input
              id="about_card_title"
              name="about_card_title"
              value={form.about_card_title}
              onChange={handleChange}
              className={inputClass}
              placeholder="Diyetisyen Elif Abanoz"
            />

            <p className="mt-2 text-xs text-[#8a9089]">
              Fotoğrafın yanındaki "Ben Kimim?" bölümünde görünür.
            </p>
          </div>

          {/* BİYOGRAFİ 1 */}

          <div>
            <label
              htmlFor="about_text_1"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Biyografi Metni 1
            </label>

            <textarea
              id="about_text_1"
              name="about_text_1"
              value={form.about_text_1}
              onChange={handleChange}
              rows={7}
              className={textareaClass}
              placeholder="Kendinizden, eğitim hayatınızdan ve mesleki geçmişinizden bahsedin..."
            />
          </div>

          {/* BİYOGRAFİ 2 */}

          <div>
            <label
              htmlFor="about_text_2"
              className="mb-2 block text-sm font-medium text-[#26352a]"
            >
              Biyografi Metni 2
            </label>

            <textarea
              id="about_text_2"
              name="about_text_2"
              value={form.about_text_2}
              onChange={handleChange}
              rows={7}
              className={textareaClass}
              placeholder="Uzmanlık alanlarınızdan, yaklaşımınızdan ve danışanlarınıza bakış açınızdan bahsedin..."
            />
          </div>

          {/* HAKKIMDA FOTOĞRAFI */}

          <ImageUpload
            label="Hakkımda Fotoğrafı"
            value={form.about_image_url}
            field="about_image_url"
            folder="site/about"
            uploadingImage={uploadingImage}
            isUploading={isUploading}
            loading={loading}
            onUpload={handleImageUpload}
            largePreview
          />

        </div>
      </section>

      {/* =========================================
          DİĞER GÖRSELLER
      ========================================= */}

      <section className={sectionClass}>

        <SectionHeader
          title="Diğer Görseller"
          description="Logo ve favicon gibi diğer site görsellerini yönetin."
        />

        <div className="grid gap-8 p-6 sm:p-8">

          <ImageUpload
            label="Logo"
            value={form.logo_url}
            field="logo_url"
            folder="site/logo"
            uploadingImage={uploadingImage}
            isUploading={isUploading}
            loading={loading}
            onUpload={handleImageUpload}
          />

          <ImageUpload
            label="Favicon"
            value={form.favicon_url}
            field="favicon_url"
            folder="site/favicon"
            uploadingImage={uploadingImage}
            isUploading={isUploading}
            loading={loading}
            onUpload={handleImageUpload}
            smallPreview
          />

        </div>
      </section>

      {/* =========================================
          HATA / BAŞARI
      ========================================= */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm">
          <span className="font-semibold">
            Hata:
          </span>{" "}
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-[#d8e4d4] bg-[#eef3eb] px-5 py-4 text-sm text-[#52634f] shadow-sm">
          <span className="mr-2">
            ✓
          </span>

          {success}
        </div>
      )}

      {/* =========================================
          KAYDET
      ========================================= */}

      <div className="sticky bottom-4 z-30 flex justify-end">

        <div className="rounded-2xl border border-[#e0e5dd] bg-white/95 p-2 shadow-[0_12px_40px_rgba(38,53,42,0.14)] backdrop-blur">

          <button
            type="submit"
            disabled={
              loading || isUploading
            }
            className="rounded-xl bg-[#71816a] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5f6f59] hover:shadow-lg hover:shadow-[#71816a]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Kaydediliyor..."
              : isUploading
                ? "Görsel yükleniyor..."
                : "Ayarları Kaydet"}
          </button>

        </div>
      </div>
    </form>
  );
}

/* =========================================
   IMAGE UPLOAD COMPONENT
========================================= */

function ImageUpload({
  label,
  value,
  field,
  folder,
  uploadingImage,
  isUploading,
  loading,
  onUpload,
  largePreview = false,
  smallPreview = false,
}: {
  label: string;
  value: string;
  field: ImageField;
  folder: string;
  uploadingImage: ImageField | null;
  isUploading: boolean;
  loading: boolean;
  onUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ImageField,
    folder: string
  ) => void;
  largePreview?: boolean;
  smallPreview?: boolean;
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-3">

        <label className="block text-sm font-medium text-[#26352a]">
          {label}
        </label>

        {value && (
          <span className="rounded-full bg-[#eef3eb] px-3 py-1 text-[11px] font-medium text-[#60705c]">
            Mevcut
          </span>
        )}

      </div>

      <div className="rounded-2xl border border-dashed border-[#d9dfd6] bg-[#fafbf9] p-4 sm:p-5">

        {value ? (
          <div
            className={`mb-5 overflow-hidden rounded-2xl bg-white ${
              smallPreview
                ? "flex h-28 items-center justify-center p-5"
                : largePreview
                  ? "h-64"
                  : "flex h-36 items-center justify-center p-6"
            }`}
          >
            <img
              src={value}
              alt={`${label} önizleme`}
              className={
                smallPreview
                  ? "h-20 w-20 object-contain"
                  : largePreview
                    ? "h-full w-full object-cover"
                    : "max-h-28 max-w-full object-contain"
              }
            />
          </div>
        ) : (
          <div className="mb-5 flex h-28 flex-col items-center justify-center rounded-2xl bg-white text-center">

            <span className="text-2xl">
              🖼️
            </span>

            <p className="mt-2 text-xs text-[#929991]">
              Henüz görsel yüklenmedi
            </p>

          </div>
        )}

        <input
          type="file"
          accept={
            field === "favicon_url"
              ? "image/png,image/webp,image/svg+xml,image/x-icon,image/vnd.microsoft.icon"
              : field === "hero_image_url" ||
                  field === "about_image_url"
                ? "image/jpeg,image/png,image/webp"
                : "image/jpeg,image/png,image/webp,image/svg+xml"
          }
          onChange={(e) =>
            onUpload(
              e,
              field,
              folder
            )
          }
          disabled={
            isUploading || loading
          }
          className="block w-full text-sm text-[#596458] file:mr-4 file:rounded-xl file:border-0 file:bg-[#71816a] file:px-5 file:py-3 file:text-sm file:font-medium file:text-white file:transition hover:file:bg-[#5f6f59] disabled:opacity-50"
        />

        <div className="mt-3 flex flex-col gap-1 text-xs text-[#8a9089] sm:flex-row sm:items-center sm:justify-between">

          <span>
            Maksimum dosya boyutu: 10 MB
          </span>

          <span>
            JPG · PNG · WebP
            {field !== "hero_image_url" &&
              field !== "about_image_url" &&
              " · SVG"}
          </span>

        </div>

        {uploadingImage === field && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#eef3eb] px-4 py-3 text-sm font-medium text-[#60705c]">

            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#71816a] border-t-transparent" />

            {label} yükleniyor...

          </div>
        )}

      </div>
    </div>
  );
}
