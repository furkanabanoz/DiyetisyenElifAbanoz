import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { createClient } from "@/app/lib/supabase/server";

type Category = {
  name: string;
  slug: string;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  published_at: string | null;
  featured: boolean;
  category: Category | null;
};

function formatDate(date: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image_url,
      cover_image_alt,
      published_at,
      featured,
      categories (
        name,
        slug
      )
    `)
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    console.error("Blog yazıları alınamadı:", error);
  }

  const blogPosts: Post[] = (posts ?? []).map((post: any) => {
    let category: Category | null = null;

    if (Array.isArray(post.categories)) {
      category = post.categories[0] ?? null;
    } else if (post.categories) {
      category = post.categories;
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? null,
      cover_image_url: post.cover_image_url ?? null,
      cover_image_alt: post.cover_image_alt ?? null,
      published_at: post.published_at ?? null,
      featured: post.featured ?? false,
      category,
    };
  });

  /*
   * Önce featured olarak işaretlenen yazıyı buluyoruz.
   * Featured yoksa ilk yayınlanan yazıyı öne çıkarıyoruz.
   */
  const featuredPost =
    blogPosts.find((post) => post.featured) ??
    blogPosts[0] ??
    null;

  const remainingPosts = featuredPost
    ? blogPosts.filter((post) => post.id !== featuredPost.id)
    : [];

  return (
    <>
      <Header />

      <main className="bg-[#faf9f6]">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#f5f1e9] px-6 py-24 lg:px-8 lg:py-32">
          {/* Dekoratif şekiller */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#dce4d5]/60 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-0 h-72 w-72 rounded-full bg-[#e9ddce]/60 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#71816a]" />

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#71816a]">
                  Blog
                </p>
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#26352a] sm:text-6xl lg:text-7xl">
                Sağlıklı yaşamı
                <br />
                <span className="text-[#71816a]">
                  birlikte keşfedelim.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#6f756e] sm:text-lg">
                Beslenme, sağlıklı yaşam ve sürdürülebilir
                alışkanlıklar hakkında güvenilir,
                anlaşılır ve günlük hayatınıza
                uyarlayabileceğiniz bilgiler.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#d8ddd5] bg-white/70 px-4 py-2 text-xs font-medium text-[#596458]">
                  Beslenme
                </span>

                <span className="rounded-full border border-[#d8ddd5] bg-white/70 px-4 py-2 text-xs font-medium text-[#596458]">
                  Sağlıklı Yaşam
                </span>

                <span className="rounded-full border border-[#d8ddd5] bg-white/70 px-4 py-2 text-xs font-medium text-[#596458]">
                  Günlük Yaşam
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            BLOG İÇERİĞİ
        ====================================================== */}

        <section className="px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">

            {error ? (

              /* ERROR */

              <div className="rounded-[2rem] border border-red-100 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
                  !
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-[#26352a]">
                  Blog yazıları yüklenemedi.
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6f756e]">
                  Yazılar alınırken beklenmeyen bir
                  sorun oluştu. Lütfen daha sonra tekrar
                  deneyin.
                </p>
              </div>

            ) : blogPosts.length === 0 ? (

              /* EMPTY */

              <div className="rounded-[2.5rem] border border-[#e4e8e1] bg-white px-6 py-20 text-center shadow-[0_10px_40px_rgba(38,53,42,0.04)]">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#eef3eb] text-3xl">
                  ✦
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#71816a]">
                  Yakında
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#26352a]">
                  İlk yazımız çok yakında.
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#6f756e]">
                  Sağlıklı beslenme ve sürdürülebilir
                  yaşam hakkında faydalı içerikler
                  burada yer alacak.
                </p>

              </div>

            ) : (

              <>

                {/* =================================================
                    ÖNE ÇIKAN YAZI
                ================================================== */}

                {featuredPost && (
                  <div className="mb-20">

                    <div className="mb-7 flex items-end justify-between gap-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816a]">
                          Öne Çıkan
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#26352a] sm:text-4xl">
                          En yeni yazımız
                        </h2>
                      </div>
                    </div>

                    <article className="group overflow-hidden rounded-[2.5rem] border border-[#e3e7e0] bg-white shadow-[0_12px_50px_rgba(38,53,42,0.06)]">

                      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

                        {/* IMAGE */}

                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="relative block min-h-[340px] overflow-hidden bg-[#dce4d5] lg:min-h-[520px]"
                        >
                          {featuredPost.cover_image_url ? (
                            <img
                              src={featuredPost.cover_image_url}
                              alt={
                                featuredPost.cover_image_alt ||
                                featuredPost.title
                              }
                              className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#dce4d5]">
                              <div className="text-center">
                                <span className="text-4xl text-[#71816a]">
                                  ✦
                                </span>

                                <p className="mt-3 text-sm font-medium text-[#71816a]">
                                  Diyetisyen Elif Abanoz
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Image overlay */}

                          <div className="absolute inset-0 bg-gradient-to-t from-[#26352a]/30 via-transparent to-transparent opacity-70" />

                          <div className="absolute left-6 top-6">
                            <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#52624d] shadow-sm backdrop-blur">
                              Öne Çıkan Yazı
                            </span>
                          </div>
                        </Link>

                        {/* CONTENT */}

                        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">

                          <div className="flex flex-wrap items-center gap-3">

                            <span className="rounded-full bg-[#eef3eb] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#71816a]">
                              {featuredPost.category?.name ??
                                "Beslenme"}
                            </span>

                            {featuredPost.published_at && (
                              <>
                                <span className="h-1 w-1 rounded-full bg-[#c5cbc3]" />

                                <time
                                  dateTime={
                                    featuredPost.published_at
                                  }
                                  className="text-xs text-[#8a9089]"
                                >
                                  {formatDate(
                                    featuredPost.published_at
                                  )}
                                </time>
                              </>
                            )}

                          </div>

                          <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-[#26352a] sm:text-4xl">
                            {featuredPost.title}
                          </h3>

                          {featuredPost.excerpt && (
                            <p className="mt-5 line-clamp-4 text-sm leading-7 text-[#6f756e] sm:text-base">
                              {featuredPost.excerpt}
                            </p>
                          )}

                          <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="group/link mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-[#71816a] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5f6f59]"
                          >
                            Yazıyı Oku

                            <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                              →
                            </span>
                          </Link>

                        </div>
                      </div>
                    </article>
                  </div>
                )}

                {/* =================================================
                    TÜM YAZILAR
                ================================================== */}

                {remainingPosts.length > 0 && (
                  <div>

                    <div className="mb-8 flex items-end justify-between gap-5">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816a]">
                          Blog
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#26352a] sm:text-4xl">
                          Diğer yazılar
                        </h2>
                      </div>

                      <p className="hidden text-sm text-[#8a9089] sm:block">
                        {remainingPosts.length} yazı
                      </p>

                    </div>

                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                      {remainingPosts.map((post) => (
                        <article
                          key={post.id}
                          className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e4e8e1] bg-white shadow-[0_8px_30px_rgba(38,53,42,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-[#d5ddd2] hover:shadow-[0_18px_45px_rgba(38,53,42,0.10)]"
                        >

                          {/* IMAGE */}

                          <Link
                            href={`/blog/${post.slug}`}
                            className="relative block aspect-[16/10] overflow-hidden bg-[#dce4d5]"
                          >
                            {post.cover_image_url ? (
                              <img
                                src={post.cover_image_url}
                                alt={
                                  post.cover_image_alt ||
                                  post.title
                                }
                                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-[#dce4d5]">
                                <div className="text-center">
                                  <span className="text-3xl text-[#71816a]">
                                    ✦
                                  </span>

                                  <p className="mt-2 text-xs font-medium text-[#71816a]">
                                    Beslenme
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                          </Link>

                          {/* CONTENT */}

                          <div className="flex flex-1 flex-col p-7">

                            <div className="flex items-center justify-between gap-3">

                              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#71816a]">
                                {post.category?.name ??
                                  "Beslenme"}
                              </span>

                              {post.published_at && (
                                <time
                                  dateTime={
                                    post.published_at
                                  }
                                  className="text-[11px] text-[#969c95]"
                                >
                                  {formatDate(
                                    post.published_at
                                  )}
                                </time>
                              )}

                            </div>

                            <Link
                              href={`/blog/${post.slug}`}
                            >
                              <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-[#26352a] transition-colors group-hover:text-[#71816a]">
                                {post.title}
                              </h3>
                            </Link>

                            {post.excerpt && (
                              <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#6f756e]">
                                {post.excerpt}
                              </p>
                            )}

                            <div className="mt-auto pt-6">

                              <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#52624d]"
                              >
                                Devamını Oku

                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                  →
                                </span>
                              </Link>

                            </div>

                          </div>
                        </article>
                      ))}

                    </div>
                  </div>
                )}

                {/* =================================================
                    ALT CTA
                ================================================== */}

                <div className="mt-24 overflow-hidden rounded-[2.5rem] bg-[#26352a] px-7 py-12 text-center sm:px-12 sm:py-16">

                  <div className="mx-auto max-w-2xl">

                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b9c8b3]">
                      Sağlıklı yaşam
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Bilgiyle başlayan,
                      <br />
                      sürdürülebilir bir değişim.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#cbd3c8]">
                      Beslenme yolculuğunuzda size uygun
                      bir yaklaşım oluşturmak için
                      birlikte çalışabiliriz.
                    </p>

                    <Link
                      href="/randevu"
                      className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#dce4d5] px-6 py-3.5 text-sm font-semibold text-[#26352a] transition hover:bg-white"
                    >
                      Randevu Oluştur

                      <span>→</span>
                    </Link>

                  </div>
                </div>

              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
