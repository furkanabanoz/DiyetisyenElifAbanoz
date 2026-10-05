"use client";

import { FormEvent, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { createClient } from "@/app/lib/supabase/client";
import RichTextEditor from "../[id]/RichTextEditor";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
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

export default function NewPostForm({
  categories,
}: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [content, setContent] =
    useState<JSONContent>(emptyContent);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function createSlug(value: string) {
    return value
      .toLocaleLowerCase("tr-TR")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slug) {
      setSlug(createSlug(value));
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");

    if (!title.trim()) {
      setMessage("Lütfen bir başlık girin.");
      return;
    }

    if (!slug.trim()) {
      setMessage("Lütfen bir URL girin.");
      return;
    }

    if (!categoryId) {
      setMessage("Lütfen bir kategori seçin.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "Oturum bulunamadı. Lütfen tekrar giriş yapın."
        );
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim() || null,
          category_id: categoryId,
          author_id: user.id,

          content,

          status: "draft",
          featured: false,
          published_at: null,
        })
        .select("id")
        .single();

      if (error) {
        throw error;
      }

      window.location.href =
        `/admin/blog/${data.id}/edit`;
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Blog yazısı kaydedilirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {message && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
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
              onChange={(event) =>
                handleTitleChange(
                  event.target.value
                )
              }
              placeholder="Örn: Sağlıklı Beslenmeye Nasıl Başlanır?"
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
              onChange={(event) =>
                setSlug(event.target.value)
              }
              placeholder="saglikli-beslenmeye-nasil-baslanir"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            <p className="mt-2 text-xs text-gray-400">
              Web adresi: /blog/
              {slug || "ornek-yazi"}
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
              onChange={(event) =>
                setExcerpt(
                  event.target.value
                )
              }
              placeholder="Yazının kısa açıklamasını girin..."
              rows={4}
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
              onChange={(event) =>
                setCategoryId(
                  event.target.value
                )
              }
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">
                Kategori seçin
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* İÇERİK */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          İçerik
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Yazınızı aşağıdaki editörden
          oluşturabilirsiniz.
        </p>

        <div className="mt-6">
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </div>
      </div>

      {/* BUTONLAR */}

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            (window.location.href =
              "/admin/blog")
          }
          className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          İptal
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Kaydediliyor..."
            : "Taslak Kaydet"}
        </button>
      </div>
    </form>
  );
}
