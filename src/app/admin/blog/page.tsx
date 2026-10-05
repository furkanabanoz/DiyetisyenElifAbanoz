import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  featured: boolean;
  published_at: string | null;
  created_at: string;
};

export default async function AdminBlogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      status,
      featured,
      published_at,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  const posts: Post[] = data ?? [];

  return (
    <main className="min-h-screen bg-[#f5f1e9] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
              Yönetim Paneli
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#26352a]">
              Blog Yazıları
            </h1>

            <p className="mt-3 text-[#6f756e]">
              Blog yazılarınızı buradan yönetebilirsiniz.
            </p>
          </div>

          {/* HEADER BUTONLARI */}

          <div className="flex flex-wrap items-center gap-3">

            <Link
              href="/admin"
              className="inline-flex items-center rounded-xl border border-[#d8ddd5] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#faf9f6]"
            >
              ← Dashboard
            </Link>

            <Link
              href="/admin/blog/new"
              className="inline-flex items-center rounded-xl bg-[#71816a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#5f6f59]"
            >
              + Yeni Blog Yazısı
            </Link>

          </div>
        </div>

        {/* HATA */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm text-red-700">
            Blog yazıları alınırken bir hata oluştu.
          </div>
        )}

        {/* BOŞ */}

        {!error && posts.length === 0 && (
          <div className="mt-10 rounded-[2rem] bg-white p-12 text-center shadow-sm">

            <h2 className="text-2xl font-semibold text-[#26352a]">
              Henüz blog yazısı yok.
            </h2>

            <p className="mt-3 text-[#6f756e]">
              İlk blog yazınızı oluşturarak başlayabilirsiniz.
            </p>

            <Link
              href="/admin/blog/new"
              className="mt-6 inline-flex rounded-xl bg-[#71816a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#5f6f59]"
            >
              İlk Yazıyı Oluştur
            </Link>

          </div>
        )}

        {/* LİSTE */}

        {posts.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-sm">

            {/* MASAÜSTÜ */}

            <div className="hidden md:block">

              <div className="grid grid-cols-[1fr_140px_140px_120px] border-b border-[#edf0eb] px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[#8a9089]">
                <span>Yazı</span>
                <span>Durum</span>
                <span>Tarih</span>
                <span className="text-right">
                  İşlem
                </span>
              </div>

              {posts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-[1fr_140px_140px_120px] items-center border-b border-[#edf0eb] px-7 py-6 last:border-b-0"
                >

                  <div>
                    <div className="flex items-center gap-3">

                      <h2 className="font-semibold text-[#26352a]">
                        {post.title}
                      </h2>

                      {post.featured && (
                        <span className="rounded-full bg-[#eef3eb] px-2.5 py-1 text-[10px] font-medium text-[#71816a]">
                          Öne Çıkan
                        </span>
                      )}

                    </div>

                    <p className="mt-1 text-xs text-[#8a9089]">
                      /blog/{post.slug}
                    </p>
                  </div>

                  <div>
                    {post.status === "published" ? (
                      <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                        Yayında
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                        Taslak
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-[#6f756e]">
                    {new Date(
                      post.published_at || post.created_at
                    ).toLocaleDateString("tr-TR")}
                  </span>

                  <div className="text-right">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-sm font-medium text-[#71816a] hover:text-[#26352a]"
                    >
                      Düzenle →
                    </Link>
                  </div>

                </div>
              ))}

            </div>

            {/* MOBİL */}

            <div className="divide-y divide-[#edf0eb] md:hidden">

              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-6"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h2 className="font-semibold text-[#26352a]">
                        {post.title}
                      </h2>

                      <p className="mt-1 text-xs text-[#8a9089]">
                        /blog/{post.slug}
                      </p>
                    </div>

                    {post.status === "published" ? (
                      <span className="shrink-0 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                        Yayında
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                        Taslak
                      </span>
                    )}

                  </div>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-xs text-[#8a9089]">
                      {new Date(
                        post.published_at || post.created_at
                      ).toLocaleDateString("tr-TR")}
                    </span>

                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-sm font-medium text-[#71816a]"
                    >
                      Düzenle →
                    </Link>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </main>
  );
}