import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import MessageActions from "./MessageActions";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default async function MessagesPage() {
  const supabase = await createClient();

  // Giriş kontrolü
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Admin kontrolü
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/admin");
  }

  // Mesajları getir
  const { data, error } = await supabase
    .from("contact_messages")
    .select(`
      id,
      name,
      email,
      phone,
      subject,
      message,
      is_read,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  const messages: Message[] = data ?? [];

  return (
    <main className="min-h-screen bg-[#f5f1e9] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#71816a]">
              Yönetim Paneli
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#26352a]">
              Gelen Mesajlar
            </h1>

            <p className="mt-3 text-[#6f756e]">
              Web siteniz üzerinden gönderilen
              iletişim mesajlarını buradan
              görüntüleyebilirsiniz.
            </p>
          </div>

          <a
            href="/admin"
            className="inline-flex w-fit rounded-xl border border-[#d8ddd5] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#faf9f6]"
          >
            ← Dashboard
          </a>
        </div>

        {/* HATA */}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 p-5 text-sm text-red-700">
            Mesajlar yüklenirken bir hata oluştu.
          </div>
        )}

        {/* BOŞ */}

        {!error && messages.length === 0 && (
          <div className="rounded-[2rem] bg-white p-12 text-center shadow-sm">
            <div className="text-4xl">
              💬
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-[#26352a]">
              Henüz mesaj yok.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#6f756e]">
              İletişim formundan gelen mesajlar
              burada görünecek.
            </p>
          </div>
        )}

        {/* MESAJLAR */}

        {!error && messages.length > 0 && (
          <div className="space-y-5">

            {messages.map((item) => (
              <article
                key={item.id}
                className={`overflow-hidden rounded-[2rem] bg-white p-7 shadow-sm ${
                  !item.is_read
                    ? "border-l-4 border-[#71816a]"
                    : ""
                }`}
              >

                {/* ÜST */}

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

                  <div>
                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-semibold text-[#26352a]">
                        {item.name}
                      </h2>

                      {!item.is_read && (
                        <span className="rounded-full bg-[#71816a] px-3 py-1 text-xs font-medium text-white">
                          Yeni
                        </span>
                      )}

                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6f756e]">

                      <span>
                        📧 {item.email}
                      </span>

                      {item.phone && (
                        <span>
                          📱 {item.phone}
                        </span>
                      )}

                    </div>
                  </div>

                  <time
                    dateTime={item.created_at}
                    className="text-sm text-[#8a9089]"
                  >
                    {new Date(
                      item.created_at
                    ).toLocaleString("tr-TR")}
                  </time>

                </div>

                {/* KONU */}

                {item.subject && (
                  <div className="mt-6">

                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#71816a]">
                      Konu
                    </p>

                    <p className="mt-2 font-medium text-[#26352a]">
                      {item.subject}
                    </p>

                  </div>
                )}

                {/* MESAJ */}

                <div className="mt-6 rounded-2xl bg-[#faf9f6] p-5">

                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#596458]">
                    {item.message}
                  </p>

                </div>

                {/* AKSİYONLAR */}

                <div className="mt-6 flex flex-wrap gap-3 border-t border-[#26352a]/5 pt-6">

                  {/* OKUNDU / OKUNMADI */}

                  <MessageActions
                    id={item.id}
                    isRead={item.is_read}
                  />

                  {/* E-POSTA */}

                  <a
                    href={`mailto:${item.email}`}
                    className="rounded-xl bg-[#71816a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#5f6f59]"
                  >
                    E-posta Gönder
                  </a>

                  {/* TELEFON */}

                  {item.phone && (
                    <a
                      href={`tel:${item.phone}`}
                      className="rounded-xl border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#f5f1e9]"
                    >
                      Ara
                    </a>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
