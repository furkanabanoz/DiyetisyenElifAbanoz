import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      cover_image_alt,
      published_at,
      featured,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !post) {
    return (
      <>
        <Header />

        <main className="min-h-[60vh] bg-[#faf9f6] px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
              Blog
            </p>

            <h1 className="mt-5 text-4xl font-semibold text-[#26352a]">
              Yazı bulunamadı
            </h1>

            <p className="mt-4 text-[#6f756e]">
              Aradığınız blog yazısı mevcut değil
              veya artık yayında değil.
            </p>

            <Link
              href="/blog"
              className="mt-8 inline-flex rounded-xl bg-[#71816a] px-6 py-3 text-sm font-medium text-white"
            >
              Bloga Dön
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const category = Array.isArray(post.categories)
    ? post.categories[0]
    : post.categories;

  return (
    <>
      <Header />

      <main className="bg-[#faf9f6]">

        {/* BAŞLIK */}

        <section className="bg-[#f5f1e9] px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl">

            <Link
              href="/blog"
              className="text-sm font-medium text-[#71816a]"
            >
              ← Bloga Dön
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#71816a]">
                {category?.name ?? "Beslenme"}
              </span>

              {post.published_at && (
                <time className="text-xs text-[#8a9089]">
                  {new Date(
                    post.published_at
                  ).toLocaleDateString("tr-TR")}
                </time>
              )}
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[#26352a] sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 text-lg leading-8 text-[#6f756e]">
                {post.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* KAPAK */}

        {post.cover_image_url && (
          <section className="px-6 pt-10 lg:pt-14">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem]">
              <img
                src={post.cover_image_url}
                alt={
                  post.cover_image_alt ||
                  post.title
                }
                className="aspect-[16/9] h-full w-full object-cover"
              />
            </div>
          </section>
        )}

        {/* İÇERİK */}

        <article className="px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">

            {Array.isArray(post.content) &&
            post.content.length > 0 ? (
              <div className="space-y-6">
                {post.content.map(
                  (
                    block: any,
                    index: number
                  ) => {
                    if (
                      typeof block ===
                      "string"
                    ) {
                      return (
                        <p
                          key={index}
                          className="text-lg leading-8 text-[#4f594f]"
                        >
                          {block}
                        </p>
                      );
                    }

                    if (
                      block?.type ===
                      "paragraph"
                    ) {
                      const text =
                        block.content
                          ?.map(
                            (item: any) =>
                              item.text ?? ""
                          )
                          .join("") ?? "";

                      return (
                        <p
                          key={index}
                          className="text-lg leading-8 text-[#4f594f]"
                        >
                          {text}
                        </p>
                      );
                    }

                    if (
                      block?.type ===
                      "heading"
                    ) {
                      const text =
                        block.content
                          ?.map(
                            (item: any) =>
                              item.text ?? ""
                          )
                          .join("") ?? "";

                      return (
                        <h2
                          key={index}
                          className="pt-6 text-3xl font-semibold text-[#26352a]"
                        >
                          {text}
                        </h2>
                      );
                    }

                    return null;
                  }
                )}
              </div>
            ) : (
              <p className="text-lg text-[#6f756e]">
                Bu yazı için henüz içerik
                eklenmemiş.
              </p>
            )}

          </div>
        </article>

      </main>

      <Footer />
    </>
  );
}
