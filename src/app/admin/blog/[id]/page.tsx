import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import EditPostForm from "./EditPostForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPostPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const [
    { data: post, error: postError },
    { data: categories, error: categoriesError },
  ] = await Promise.all([
    supabase
      .from("posts")
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        cover_image_url,
        cover_image_alt,
        category_id,
        seo_title,
        seo_description,
        status,
        featured,
        published_at
      `)
      .eq("id", id)
      .single(),

    supabase
      .from("categories")
      .select("id, name, slug")
      .order("name"),
  ]);

  if (postError || !post) {
    notFound();
  }

  if (categoriesError) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] p-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-red-50 p-6 text-red-700">
            Kategoriler yüklenemedi.
            <br />
            {categoriesError.message}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            href="/admin/blog"
            className="text-sm text-emerald-700 hover:underline"
          >
            ← Blog Yazılarına Dön
          </Link>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Blog Yazısını Düzenle
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Yazınızı düzenleyin ve yayınlayın.
              </p>
            </div>

            <span
              className={
                post.status === "published"
                  ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                  : "rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
              }
            >
              {post.status === "published"
                ? "Yayında"
                : "Taslak"}
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <EditPostForm
          post={post}
          categories={categories ?? []}
        />
      </section>
    </main>
  );
}