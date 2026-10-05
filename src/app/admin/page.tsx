import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login");
  }

  const { count: postCount } = await supabase
    .from("posts")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: publishedCount } = await supabase
    .from("posts")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "published");

  const { count: messageCount } = await supabase
    .from("contact_messages")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: unreadCount } = await supabase
    .from("contact_messages")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("is_read", false);

  const { count: appointmentCount } = await supabase
    .from("appointment_requests")
    .select("*", {
      count: "exact",
      head: true,
    });

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
              Hoş geldiniz
              {profile.full_name
                ? `, ${profile.full_name}`
                : ""}
            </h1>

            <p className="mt-3 text-[#6f756e]">
              Diyetisyen Elif Abanoz web
              sitesini buradan yönetebilirsiniz.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex w-fit rounded-xl border border-[#d8ddd5] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#faf9f6]"
          >
            Siteyi Gör →
          </Link>
        </div>

        {/* İSTATİSTİKLER */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              Toplam Blog
            </p>

            <p className="mt-3 text-4xl font-semibold text-[#26352a]">
              {postCount ?? 0}
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              Yayındaki Blog
            </p>

            <p className="mt-3 text-4xl font-semibold text-[#26352a]">
              {publishedCount ?? 0}
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              Toplam Mesaj
            </p>

            <p className="mt-3 text-4xl font-semibold text-[#26352a]">
              {messageCount ?? 0}
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#71816a] p-7 text-white shadow-sm">
            <p className="text-sm text-white/75">
              Okunmamış Mesaj
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {unreadCount ?? 0}
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              Randevu Talepleri
            </p>

            <p className="mt-3 text-4xl font-semibold text-[#26352a]">
              {appointmentCount ?? 0}
            </p>
          </div>

        </div>

        {/* MENÜ */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {/* BLOG */}

          <Link
            href="/admin/blog"
            className="group rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">📝</div>

            <h2 className="mt-5 text-xl font-semibold text-[#26352a]">
              Blog Yazıları
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6f756e]">
              Blog yazılarını görüntüle,
              düzenle ve yönet.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-[#71816a]">
              Blogları Yönet →
            </span>
          </Link>

          {/* YENİ BLOG */}

          <Link
            href="/admin/blog/new"
            className="group rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">➕</div>

            <h2 className="mt-5 text-xl font-semibold text-[#26352a]">
              Yeni Blog
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6f756e]">
              Yeni bir blog yazısı oluştur
              ve yayınla.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-[#71816a]">
              Yazı Oluştur →
            </span>
          </Link>

          {/* MESAJLAR */}

          <Link
            href="/admin/messages"
            className="group rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">📩</div>

            <h2 className="mt-5 text-xl font-semibold text-[#26352a]">
              Gelen Mesajlar
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6f756e]">
              Ziyaretçilerden gelen iletişim
              mesajlarını görüntüle.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-[#71816a]">
              Mesajlara Git →
            </span>
          </Link>

          {/* RANDEVULAR */}

          <Link
            href="/admin/appointments"
            className="group rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">📅</div>

            <h2 className="mt-5 text-xl font-semibold text-[#26352a]">
              Randevu Talepleri
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6f756e]">
              Gelen randevu taleplerini
              görüntüle ve takip et.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-[#71816a]">
              Randevulara Git →
            </span>
          </Link>

          {/* HİZMETLER */}

          <Link
            href="/admin/services"
            className="group rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">🩺</div>

            <h2 className="mt-5 text-xl font-semibold text-[#26352a]">
              Hizmetler
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6f756e]">
              Sitede yer alan hizmetleri
              görüntüle ve yönet.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-[#71816a]">
              Hizmetlere Git →
            </span>
          </Link>

          {/* SİTE AYARLARI */}

          <Link
            href="/admin/settings"
            className="group rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">⚙️</div>

            <h2 className="mt-5 text-xl font-semibold text-[#26352a]">
              Site Ayarları
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6f756e]">
              Telefon, WhatsApp, e-posta ve
              diğer site bilgilerini yönet.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-[#71816a]">
              Ayarları Yönet →
            </span>
          </Link>

        </div>

      </div>
    </main>
  );
}
