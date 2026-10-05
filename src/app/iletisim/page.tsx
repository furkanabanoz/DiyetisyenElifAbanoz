import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactSection from "@/app/components/ContactSection";
import { createClient } from "@/app/lib/supabase/server";

export default async function ContactPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select(`
      phone,
      whatsapp,
      email,
      address,
      instagram_url,
      facebook_url,
      youtube_url
    `)
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-[#f5f1e9]">
      <Header />

      <ContactSection settings={settings} />

      <Footer />
    </main>
  );
}
