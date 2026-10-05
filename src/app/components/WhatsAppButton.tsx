"use client";

import { useMemo } from "react";

type Props = {
phone: string | null | undefined;
};

export default function WhatsAppButton({ phone }: Props) {
const whatsappUrl = useMemo(() => {
if (!phone) {
return null;
}

const cleanedPhone = phone.replace(/\D/g, "");

if (!cleanedPhone) {
  return null;
}

return `https://wa.me/${cleanedPhone}`;

}, [phone]);

if (!whatsappUrl) {
return null;
}

return (
<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp üzerinden iletişime geç" title="WhatsApp üzerinden iletişime geç" className=" fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_10px_35px_rgba(37,211,102,0.45)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 active:scale-95 sm:bottom-7 sm:right-7 " >
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-7 w-7" >
<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />

    <path d="M20.52 3.449C18.24 1.194 15.243 0 12.05 0 5.46 0 .09 5.368.087 11.98c0 2.112.552 4.174 1.6 5.99L0 24l6.19-1.623a11.94 11.94 0 0 0 5.86 1.49h.005c6.59 0 11.96-5.368 11.963-11.98 0-3.194-1.222-6.191-3.498-8.438zM12.055 21.87h-.004a9.9 9.9 0 0 1-5.048-1.381l-.362-.215-3.674.963.981-3.584-.236-.368a9.9 9.9 0 0 1-1.52-5.305c0-5.49 4.466-9.956 9.97-9.956 2.66 0 5.157 1.037 7.035 2.918a9.92 9.92 0 0 1 2.91 7.056c-.002 5.49-4.47 9.956-9.952 9.956z" />
  </svg>

  <span className="absolute right-0 top-0 flex h-3 w-3">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60" />
    <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-[#25D366]" />
  </span>
</a>

);
}