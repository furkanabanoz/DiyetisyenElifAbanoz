"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Props = {
id: string;
status: string;
};

const statuses = [
{
value: "pending",
label: "Bekliyor",
},
{
value: "confirmed",
label: "Onaylandı",
},
{
value: "completed",
label: "Tamamlandı",
},
{
value: "cancelled",
label: "İptal edildi",
},
];

export default function AppointmentActions({
id,
status,
}: Props) {
const [currentStatus, setCurrentStatus] =
useState(status);

const [loading, setLoading] =
useState(false);

async function updateStatus(newStatus: string) {
if (newStatus === currentStatus) {
return;
}

if (
  newStatus === "cancelled" &&
  !window.confirm(
    "Bu randevuyu iptal etmek istediğinize emin misiniz?"
  )
) {
  return;
}

setLoading(true);

const { error } = await supabase
  .from("appointment_requests")
  .update({
    status: newStatus,
  })
  .eq("id", id);

if (error) {
  console.error(
    "Randevu durumu güncellenemedi:",
    error
  );

  alert(
    "Randevu durumu güncellenemedi. Lütfen tekrar deneyin."
  );

  setLoading(false);
  return;
}

setCurrentStatus(newStatus);

// Veritabanındaki güncel durumu ve
// istatistikleri tekrar almak için sayfayı yenile.
window.location.reload();


}

async function deleteAppointment() {
const confirmed = window.confirm(
"Bu randevuyu kalıcı olarak silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz."
);

if (!confirmed) {
  return;
}

setLoading(true);

const { error } = await supabase
  .from("appointment_requests")
  .delete()
  .eq("id", id);

if (error) {
  console.error(
    "Randevu silinemedi:",
    error
  );

  alert(
    "Randevu silinemedi. Lütfen tekrar deneyin."
  );

  setLoading(false);
  return;
}

window.location.reload();


}

return (
<>
<select
value={currentStatus}
onChange={(event) =>
updateStatus(event.target.value)
}
disabled={loading}
className="rounded-xl border border-[#dfe3dc] bg-white px-4 py-3 text-sm font-medium text-[#596458] outline-none transition focus:border-[#71816a] disabled:cursor-not-allowed disabled:opacity-50"
>
{statuses.map((item) => (
<option key={item.value} value={item.value} >
{item.label}
</option>
))}
</select>

  <button
    type="button"
    onClick={deleteAppointment}
    disabled={loading}
    className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {loading
      ? "İşleniyor..."
      : "Randevuyu Sil"}
  </button>
</>


);
}