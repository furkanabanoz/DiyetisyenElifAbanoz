import type { Metadata } from "next";
import "./globals.css";
import { createClient } from "@/app/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("logo_url")
    .limit(1)
    .maybeSingle();

  const logoUrl = settings?.logo_url || undefined;

  return {
    title: {
      default: "Diyetisyen Elif Abanoz | Beslenme Danışmanlığı",
      template: "%s | Diyetisyen Elif Abanoz",
    },

    description:
      "Diyetisyen Elif Abanoz ile sağlıklı, dengeli ve sürdürülebilir beslenme danışmanlığı.",

    keywords: [
      "Diyetisyen Elif Abanoz",
      "diyetisyen",
      "beslenme danışmanlığı",
      "sağlıklı beslenme",
      "online diyetisyen",
    ],

    authors: [
      {
        name: "Diyetisyen Elif Abanoz",
      },
    ],

    creator: "Diyetisyen Elif Abanoz",

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Diyetisyen Elif Abanoz",
      title: "Diyetisyen Elif Abanoz | Beslenme Danışmanlığı",
      description:
        "Sağlıklı ve sürdürülebilir beslenme için profesyonel danışmanlık.",
    },

    twitter: {
      card: "summary_large_image",
      title: "Diyetisyen Elif Abanoz | Beslenme Danışmanlığı",
      description:
        "Sağlıklı ve sürdürülebilir beslenme için profesyonel danışmanlık.",
    },

    icons: {
      icon: logoUrl
        ? [
            {
              url: logoUrl,
              type: "image/png",
            },
          ]
        : undefined,

      shortcut: logoUrl
        ? [
            {
              url: logoUrl,
              type: "image/png",
            },
          ]
        : undefined,

      apple: logoUrl
        ? [
            {
              url: logoUrl,
              type: "image/png",
            },
          ]
        : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}