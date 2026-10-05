"use client";

import { useState } from "react";
import type { JSONContent } from "@tiptap/react";
import { createClient } from "@/app/lib/supabase/client";
import RichTextEditor from "./RichTextEditor";
import CoverImageUpload from "./CoverImageUpload";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: unknown;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
  featured: boolean;
  published_at: string | null;
};

type Props = {
  post: Post;
  categories: Category[];
};

const emptyContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

function normalizeContent(
  content: unknown
): JSONContent {
  if (
    content &&
    typeof content === "object" &&
    !Array.isArray(content)
  ) {
    return content as JSONContent;
  }

  if (Array.isArray(content)) {
    return {
      type: "doc",
      content: content as JSONContent[],
    };
  }

  return emptyContent;
}

export default function EditPostForm({
  post,
  categories,
}: Props) {
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [excerpt, setExcerpt] = useState(
    post.excerpt ?? ""
  );

  const [categoryId, setCategoryId] = useState(
    post.category_id ?? ""
  );

  const [content, setContent] =
    useState<JSONContent>(
      normalizeContent(post.content)
    );

  const [coverImageUrl, setCoverImageUrl] =
    useState(
      post.cover_image_url ?? ""
    );

  const [coverImageAlt, setCoverImageAlt] =
    useState(
      post.cover_image_alt ?? ""
    );

  const [seoTitle, setSeoTitle] = useState(
    post.seo_title ?? ""
  );

  const [seoDescription, setSeoDescription] =
    useState(
      post.seo_description ?? ""
    );

  const [featured, setFeatured] =
    useState(post.featured);

  const [status, setStatus] = useState<
    "draft" | "published"
  >(post.status);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    nextStatus: "draft" | "published"
  ) {
    setLoading(true);
    setMessage("");

    try {
      if (!title.trim()) {
        throw new Error(
          "Lütfen bir başlık girin."
        );
      }

      if (!slug.trim()) {
        throw new Error(
          "Lütfen bir URL girin."
        );
      }

      const supabase = createClient();

      const updateData = {
        title: title.trim(),

        slug: slug.trim(),

        excerpt:
          excerpt.trim() || null,

        category_id:
          categoryId || null,

        content,

        cover_image_url:
          coverImageUrl || null,

        cover_image_alt:
          coverImageAlt.trim() || null,

        seo_title:
          seoTitle.trim() || null,

        seo_description:
          seoDescription.trim() || null,

        featured,

        status: nextStatus,

        published_at:
          nextStatus === "published"
            ? post.published_at ??
              new Date().toISOString()
            : null,

        updated_at:
          new Date().toISOString(),
      };

      const { error } = await supabase
        .from("posts")
        .update(updateData)
        .eq("id", post.id);

      if (error) {
        throw error;
      }

      setStatus(nextStatus);

      setMessage(
        nextStatus === "published"
          ? "Yazı başarıyla yayınlandı."
          : "Taslak başarıyla kaydedildi."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Yazı kaydedilirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* MESAJ */}

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {message}
        </div>
      )}

      {/* TEMEL BİLGİLER */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Temel Bilgiler
        </h2>

        <div className="mt-6 space-y-5">
          {/* BAŞLIK */}

          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Başlık
            </label>

            <input
              id="title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* URL */}

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              URL
            </label>

            <input
              id="slug"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            <p className="mt-2 text-xs text-gray-400">
              Web adresi: /blog/{slug}
            </p>
          </div>

          {/* AÇIKLAMA */}

          <div>
            <label
              htmlFor="excerpt"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Kısa Açıklama
            </label>

            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) =>
                setExcerpt(e.target.value)
              }
              rows={4}
              placeholder="Yazının kısa açıklamasını girin..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* KATEGORİ */}

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Kategori
            </label>

            <select
              id="category"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">
                Kategori seçin
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      {/* KAPAK GÖRSELİ */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Kapak Görseli
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Blog yazısının ana görselini
          buradan yükleyebilirsin.
        </p>

        <div className="mt-6">
          <CoverImageUpload
            imageUrl={
              coverImageUrl || null
            }
            alt={coverImageAlt}
            onImageUploaded={
              setCoverImageUrl
            }
            onAltChange={
              setCoverImageAlt
            }
          />
        </div>
      </div>

      {/* İÇERİK */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          İçerik
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Blog yazınızın içeriğini
          düzenleyebilirsiniz.
        </p>

        <div className="mt-6">
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </div>
      </div>

      {/* SEO */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          SEO
        </h2>

        <div className="mt-6 space-y-5">
          {/* SEO BAŞLIK */}

          <div>
            <label
              htmlFor="seoTitle"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              SEO Başlığı
            </label>

            <input
              id="seoTitle"
              value={seoTitle}
              onChange={(e) =>
                setSeoTitle(e.target.value)
              }
              maxLength={60}
              placeholder="Google'da görünecek başlık"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            <p className="mt-1 text-xs text-gray-400">
              {seoTitle.length}/60
            </p>
          </div>

          {/* SEO AÇIKLAMA */}

          <div>
            <label
              htmlFor="seoDescription"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              SEO Açıklaması
            </label>

            <textarea
              id="seoDescription"
              value={seoDescription}
              onChange={(e) =>
                setSeoDescription(
                  e.target.value
                )
              }
              maxLength={160}
              rows={3}
              placeholder="Google sonuçlarında görünecek açıklama"
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            <p className="mt-1 text-xs text-gray-400">
              {seoDescription.length}/160
            </p>
          </div>
        </div>
      </div>

      {/* ÖNE ÇIKAN */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />

          <span>
            <span className="block text-sm font-medium text-gray-800">
              Öne çıkan yazı
            </span>

            <span className="block text-xs text-gray-500">
              Bu yazıyı ana sayfada öne
              çıkar.
            </span>
          </span>
        </label>
      </div>

      {/* DURUM */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Yazı durumu
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Şu an:{" "}
              <span className="font-medium">
                {status === "published"
                  ? "Yayında"
                  : "Taslak"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* TASLAK */}

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleSubmit("draft")
              }
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Kaydediliyor..."
                : "Taslak Kaydet"}
            </button>

            {/* YAYINLA */}

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleSubmit(
                  "published"
                )
              }
              className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Yayınlanıyor..."
                : "Yayınla"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
