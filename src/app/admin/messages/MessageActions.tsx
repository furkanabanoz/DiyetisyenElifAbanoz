"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Props = {
id: string;
isRead: boolean;
};

export default function MessageActions({
id,
isRead,
}: Props) {
const [read, setRead] = useState(isRead);
const [loading, setLoading] = useState(false);

async function toggleRead() {
setLoading(true);

const { error } = await supabase
  .from("contact_messages")
  .update({
    is_read: !read,
  })
  .eq("id", id);

if (error) {
  console.error(
    "Mesaj durumu güncellenemedi:",
    error
  );

  alert(
    "Mesaj durumu güncellenemedi. Lütfen tekrar deneyin."
  );

  setLoading(false);
  return;
}

setRead(!read);
setLoading(false);


}

async function deleteMessage() {
const confirmed = window.confirm(
"Bu mesajı kalıcı olarak silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz."
);

if (!confirmed) {
  return;
}

setLoading(true);

const { error } = await supabase
  .from("contact_messages")
  .delete()
  .eq("id", id);

if (error) {
  console.error(
    "Mesaj silinemedi:",
    error
  );

  alert(
    "Mesaj silinemedi. Lütfen tekrar deneyin."
  );

  setLoading(false);
  return;
}

window.location.reload();


}

return (
<>
<button type="button" onClick={toggleRead} disabled={loading} className="rounded-xl border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#f5f1e9] disabled:cursor-not-allowed disabled:opacity-50" >
{loading
? "Güncelleniyor..."
: read
? "Okunmadı Yap"
: "Okundu Yap"}
</button>

  <button
    type="button"
    onClick={deleteMessage}
    disabled={loading}
    className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {loading
      ? "İşleniyor..."
      : "Mesajı Sil"}
  </button>
</>


);
}