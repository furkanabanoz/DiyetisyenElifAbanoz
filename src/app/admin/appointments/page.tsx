import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import AppointmentFilters from "./AppointmentFilters";

type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointment_type: string;
  preferred_date: string | null;
  preferred_time: string | null;
  note: string | null;
  status: string;
  created_at: string;
};

export default async function AppointmentsPage() {
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
    redirect("/admin");
  }

  const {
    data,
    error,
  } = await supabase
    .from("appointment_requests")
    .select(`
      id,
      name,
      email,
      phone,
      appointment_type,
      preferred_date,
      preferred_time,
      note,
      status,
      created_at
    `)
    .order("preferred_date", {
      ascending: true,
      nullsFirst: false,
    })
    .order("preferred_time", {
      ascending: true,
      nullsFirst: false,
    });

  const appointments: Appointment[] = data ?? [];

  const pendingCount = appointments.filter(
    (item) => item.status === "pending"
  ).length;

  const confirmedCount = appointments.filter(
    (item) => item.status === "confirmed"
  ).length;

  const completedCount = appointments.filter(
    (item) => item.status === "completed"
  ).length;

  const cancelledCount = appointments.filter(
    (item) => item.status === "cancelled"
  ).length;

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
              Randevular
            </h1>

            <p className="mt-3 max-w-2xl text-[#6f756e]">
              Web siteniz üzerinden gelen randevu
              taleplerini buradan takip ve yönetebilirsiniz.
            </p>
          </div>

          <a
            href="/admin"
            className="inline-flex w-fit rounded-xl border border-[#d8ddd5] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#faf9f6]"
          >
            ← Dashboard
          </a>
        </div>

        {/* İSTATİSTİKLER */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              Bekleyen
            </p>

            <p className="mt-3 text-4xl font-semibold text-[#d18b24]">
              {pendingCount}
            </p>

            <p className="mt-2 text-sm text-[#8a9089]">
              İşlem bekleyen talepler
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              Onaylanan
            </p>

            <p className="mt-3 text-4xl font-semibold text-[#526a80]">
              {confirmedCount}
            </p>

            <p className="mt-2 text-sm text-[#8a9089]">
              Planlanmış randevular
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              Tamamlanan
            </p>

            <p className="mt-3 text-4xl font-semibold text-[#71816a]">
              {completedCount}
            </p>

            <p className="mt-2 text-sm text-[#8a9089]">
              Gerçekleşen randevular
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-sm text-[#8a9089]">
              İptal
            </p>

            <p className="mt-3 text-4xl font-semibold text-red-500">
              {cancelledCount}
            </p>

            <p className="mt-2 text-sm text-[#8a9089]">
              İptal edilen randevular
            </p>
          </div>

        </div>

        {/* HATA */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm text-red-700">
            Randevular yüklenirken bir hata oluştu.
          </div>
        )}

        {/* BOŞ */}

        {!error && appointments.length === 0 && (
          <div className="mt-8 rounded-[2rem] bg-white p-12 text-center shadow-sm">

            <div className="text-4xl">
              📅
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-[#26352a]">
              Henüz randevu talebi yok.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#6f756e]">
              Web sitenizdeki randevu formundan gelen
              talepler burada görünecek.
            </p>

          </div>
        )}

        {/* RANDEVULAR + FİLTRE */}

        {!error && appointments.length > 0 && (
          <AppointmentFilters
            appointments={appointments}
          />
        )}

      </div>
    </main>
  );
}
