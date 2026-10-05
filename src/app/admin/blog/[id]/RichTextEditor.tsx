"use client";

import {
  EditorContent,
  useEditor,
  JSONContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import { useRef, useState } from "react";
import { uploadBlogImage } from "@/app/lib/supabase/storage";

type Props = {
  content: JSONContent;
  onChange: (content: JSONContent) => void;
};

export default function RichTextEditor({
  content,
  onChange,
}: Props) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [imageError, setImageError] =
    useState("");

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content,

    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file || !editor) {
      return;
    }

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError(
        "Lütfen bir görsel dosyası seçin."
      );

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError(
        "Görsel en fazla 5 MB olabilir."
      );

      return;
    }

    setUploadingImage(true);

    try {
      const result =
        await uploadBlogImage(file);

      editor
        .chain()
        .focus()
        .setImage({
          src: result.url,
          alt: file.name,
        })
        .run();
    } catch (error) {
      console.error(error);

      setImageError(
        error instanceof Error
          ? error.message
          : "Görsel yüklenemedi."
      );
    } finally {
      setUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  if (!editor) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
        Editör yükleniyor...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* TOOLBAR */}

      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {/* BOLD */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`rounded-lg px-3 py-2 text-sm font-bold ${
            editor.isActive("bold")
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          B
        </button>

        {/* ITALIC */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`rounded-lg px-3 py-2 text-sm italic ${
            editor.isActive("italic")
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          I
        </button>

        <div className="mx-1 w-px bg-gray-200" />

        {/* H2 */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${
            editor.isActive("heading", {
              level: 2,
            })
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          H2
        </button>

        {/* H3 */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 3,
              })
              .run()
          }
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${
            editor.isActive("heading", {
              level: 3,
            })
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          H3
        </button>

        <div className="mx-1 w-px bg-gray-200" />

        {/* BULLET LIST */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className={`rounded-lg px-3 py-2 text-sm ${
            editor.isActive("bulletList")
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          • Liste
        </button>

        {/* ORDERED LIST */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
          className={`rounded-lg px-3 py-2 text-sm ${
            editor.isActive("orderedList")
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          1. Liste
        </button>

        <div className="mx-1 w-px bg-gray-200" />

        {/* BLOCKQUOTE */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
          className={`rounded-lg px-3 py-2 text-sm ${
            editor.isActive("blockquote")
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Alıntı
        </button>

        {/* LINK */}

        <button
          type="button"
          onClick={() => {
            const url = window.prompt(
              "Bağlantı adresini girin:"
            );

            if (!url) {
              return;
            }

            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({
                href: url,
              })
              .run();
          }}
          className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          🔗 Link
        </button>

        {/* REMOVE LINK */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .unsetLink()
              .run()
          }
          className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Link kaldır
        </button>

        <div className="mx-1 w-px bg-gray-200" />

        {/* IMAGE */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          type="button"
          disabled={uploadingImage}
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploadingImage
            ? "📤 Yükleniyor..."
            : "📷 Görsel Ekle"}
        </button>
      </div>

      {/* IMAGE ERROR */}

      {imageError && (
        <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {imageError}
        </div>
      )}

      {/* EDITOR */}

      <EditorContent
        editor={editor}
        className="prose prose-emerald max-w-none px-6 py-6"
      />
    </div>
  );
}