"use client";

import { useRef, useState } from "react";
import { uploadBlogImage } from "@/app/lib/supabase/storage";

type Props = {
  imageUrl: string | null;
  alt: string;
  onImageUploaded: (
    url: string
  ) => void;
  onAltChange: (
    alt: string
  ) => void;
};

export default function CoverImageUpload({
  imageUrl,
  alt,
  onImageUploaded,
  onAltChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (!file.type.startsWith("image/")) {
      setError(
        "Lütfen bir görsel dosyası seçin."
      );

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Görsel en fazla 5 MB olabilir."
      );

      return;
    }

    setUploading(true);

    try {
      const result =
        await uploadBlogImage(file);

      onImageUploaded(result.url);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Görsel yüklenemedi."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-4">
      {imageUrl ? (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <img
            src={imageUrl}
            alt={alt || "Blog kapak görseli"}
            className="aspect-video w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
          <div className="text-center">
            <div className="text-4xl">
              📷
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Henüz kapak görseli yok
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() =>
          inputRef.current?.click()
        }
        className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading
          ? "Görsel yükleniyor..."
          : imageUrl
            ? "Kapak Görselini Değiştir"
            : "Kapak Görseli Yükle"}
      </button>

      <div>
        <label
          htmlFor="coverImageAlt"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Görsel Alternatif Metni
        </label>

        <input
          id="coverImageAlt"
          value={alt}
          onChange={(e) =>
            onAltChange(e.target.value)
          }
          placeholder="Örn: Sağlıklı kahvaltı tabağı"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}