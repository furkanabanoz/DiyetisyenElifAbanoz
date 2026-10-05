import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

type Category = {
name: string;
slug: string;
};

type BlogPost = {
id: string;
title: string;
slug: string;
excerpt: string | null;
cover_image_url: string | null;
cover_image_alt: string | null;
published_at: string | null;
category: Category | null;
};

export default async function BlogPreview() {
const supabase = await createClient();

const { data, error } = await supabase
  .from("posts")
  .select(`
    id,
    title,
    slug,
    excerpt,
    cover_image_url,
    cover_image_alt,
    published_at,
    categories (
      name,
      slug
    )
  `)
  .eq("status", "published")
  .order("published_at", {
    ascending: false,
  })
  .limit(3);

if (error) {
console.error("Blog yazıları alınamadı:", error);
}

const blogPosts: BlogPost[] = (data ?? []).map(
(item: any): BlogPost => {
let category: Category | null = null;

  if (Array.isArray(item.categories)) {
    category = item.categories[0] ?? null;
  } else if (item.categories) {
    category = item.categories;
  }

  return {
    id: String(item.id),
    title: String(item.title ?? ""),
    slug: String(item.slug ?? ""),
    excerpt: item.excerpt ?? null,
    cover_image_url: item.cover_image_url ?? null,
    cover_image_alt: item.cover_image_alt ?? null,
    published_at: item.published_at ?? null,
    category,
  };
}

);

return (
<section className="relative overflow-hidden bg-[#faf9f6] px-6 py-24 lg:py-32">
{/* DEKORATİF ARKA PLAN */}

  <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#e4eadf]/50 blur-3xl" />

  <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#e9ddce]/40 blur-3xl" />

  <div className="relative mx-auto max-w-7xl">

    {/* BAŞLIK */}

    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#71816a]/20 bg-white px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#71816a]" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52624d]">
            Blog
          </span>
        </div>

        <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#26352a] sm:text-5xl lg:text-6xl">
          Beslenme hakkında
          <br className="hidden sm:block" />
          bilmeniz gerekenler.
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-7 text-[#6f756e] sm:text-lg">
          Sağlıklı yaşam, beslenme ve günlük hayatınıza
          uyarlayabileceğiniz pratik bilgiler üzerine
          hazırlanan içerikleri keşfedin.
        </p>
      </div>

      <Link
        href="/blog"
        className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-[#26352a]/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#52624d] shadow-sm transition duration-300 hover:border-[#71816a]/30 hover:bg-[#71816a] hover:text-white"
      >
        Tüm Yazıları Gör

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>

    {/* BLOG YAZILARI */}

    {blogPosts.length === 0 ? (
      <div className="mt-14 rounded-[2rem] border border-[#26352a]/8 bg-white p-12 text-center shadow-[0_10px_40px_rgba(38,53,42,0.04)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4eadf]">
          <span className="text-xl">✦</span>
        </div>

        <h3 className="mt-5 text-xl font-semibold text-[#26352a]">
          Henüz yayınlanmış yazı bulunmuyor.
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6f756e]">
          Yeni blog yazıları yayınlandığında burada
          görüntülenecek.
        </p>
      </div>
    ) : (
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {blogPosts.map((blogPost, index) => (
          <article
            key={blogPost.id}
            className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#26352a]/8 bg-white shadow-[0_8px_35px_rgba(38,53,42,0.04)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(38,53,42,0.10)]"
          >
            {/* GÖRSEL */}

            <Link
              href={`/blog/${blogPost.slug}`}
              className="relative block overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#dce4d5]">
                {blogPost.cover_image_url ? (
                  <img
                    src={blogPost.cover_image_url}
                    alt={
                      blogPost.cover_image_alt ||
                      blogPost.title
                    }
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#dce4d5]">
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/70">
                        <span className="text-xl text-[#71816a]">
                          ✦
                        </span>
                      </div>

                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-[#71816a]">
                        Beslenme
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* NUMARA */}

              <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-[#52624d] shadow-sm backdrop-blur">
                0{index + 1}
              </div>
            </Link>

            {/* İÇERİK */}

            <div className="flex flex-1 flex-col p-7 sm:p-8">
              {/* META */}

              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-[#eef3eb] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#60705c]">
                  {blogPost.category
                    ? blogPost.category.name
                    : "Beslenme"}
                </span>

                {blogPost.published_at && (
                  <time
                    dateTime={blogPost.published_at}
                    className="text-xs text-[#8a9089]"
                  >
                    {new Date(
                      blogPost.published_at
                    ).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>

              {/* BAŞLIK */}

              <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight text-[#26352a] transition duration-300 group-hover:text-[#52624d]">
                {blogPost.title}
              </h3>

              {/* AÇIKLAMA */}

              {blogPost.excerpt && (
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#6f756e]">
                  {blogPost.excerpt}
                </p>
              )}

              {/* ALT */}

              <div className="mt-auto pt-7">
                <Link
                  href={`/blog/${blogPost.slug}`}
                  className="group/link inline-flex items-center gap-3 border-b border-[#71816a]/30 pb-1 text-sm font-semibold text-[#52624d] transition hover:border-[#52624d]"
                >
                  Yazıyı Oku

                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}

    {/* ALT CTA */}

    {blogPosts.length > 0 && (
      <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[1.75rem] border border-[#26352a]/8 bg-[#e4eadf]/50 px-6 py-6 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-[#26352a]">
            Daha fazla bilgi keşfetmek ister misiniz?
          </p>

          <p className="mt-1 text-sm text-[#6f756e]">
            Tüm beslenme yazılarına göz atabilirsiniz.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#26352a] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#52624d]"
        >
          Blogu Keşfet

          <span>→</span>
        </Link>
      </div>
    )}
  </div>
</section>

);
}