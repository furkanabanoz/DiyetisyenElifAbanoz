import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f6] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
          404
        </p>

        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-[#26352a] sm:text-6xl">
          Sayfa bulunamadı.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#6f756e]">
          Aradığınız sayfa kaldırılmış, taşınmış veya
          adresi yanlış yazılmış olabilir.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-[#71816a] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#5f6f59] hover:shadow-md"
          >
            Ana Sayfaya Dön
          </Link>

          <Link
            href="/blog"
            className="rounded-full border border-[#dfe3dc] bg-white px-7 py-3.5 text-sm font-medium text-[#526052] transition hover:bg-[#f5f1e9]"
          >
            Blog Yazılarına Git
          </Link>
        </div>
      </div>
    </main>
  );
}
