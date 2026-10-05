import { createClient } from "@/app/lib/supabase/server";

import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustSection from "./components/TrustSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BlogPreview from "./components/BlogPreview";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";
import WhatsAppButton from "./components/WhatsAppButton";

export default async function Home() {
const supabase = await createClient();

const { data: settings } = await supabase
.from("site_settings")
.select("*")
.limit(1)
.maybeSingle();

return (
<>
<Header />

  <main>
    <Hero settings={settings} />

    <TrustSection />

    <AboutSection />

    <ServicesSection />

    <ProcessSection />

    <TestimonialsSection />

    <BlogPreview />

    <FAQSection />

    <CTASection />

    <ContactSection settings={settings} />

  </main>

  <Footer />

  <WhatsAppButton
    phone={settings?.whatsapp}
  />
</>


);
}