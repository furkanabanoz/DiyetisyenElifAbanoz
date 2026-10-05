"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f6] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
          Bir sorun oluştu
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#26352a] sm:text-5xl">
          Sayfa yüklenemedi.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#6f756e]">
          Beklenmeyen bir sorun oluştu. Tekrar
          deneyebilir veya ana sayfaya dönebilirsiniz.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[#71816a] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#5f6f59] hover:shadow-md"
          >
            Tekrar Dene
          </button>

          <Link
            href="/"
            className="rounded-full border border-[#dfe3dc] bg-white px-7 py-3.5 text-sm font-medium text-[#526052] transition hover:bg-[#f5f1e9]"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
