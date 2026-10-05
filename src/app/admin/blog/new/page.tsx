import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import NewPostForm from "./NewPostForm";

export default async function NewBlogPostPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  if (error) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] p-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-red-50 p-6 text-red-700">
            Kategoriler yüklenemedi:
            <br />
            {error.message}
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

          <h1 className="mt-2 text-2xl font-semibold text-gray-900">
            Yeni Blog Yazısı
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <NewPostForm categories={categories ?? []} />
      </section>
    </main>
  );
}

