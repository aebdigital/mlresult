import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ML Result & Gran - Doprava, Stavebnictvo, Ocelove Konstrukcie | Slovensko",
  description: "ML Result a Gran s.r.o. - spolahlivy slovenske spolocnosti specializujuce sa na nakladnu dopravu, stavebnictvo, ocelove konstrukcie a prenajom stavebnej techniky. 25+ rokov skusenosti, 200+ projektov.",
  keywords: "nakladna doprava, stavebnictvo, ocelove konstrukcie, prenajom techniky, ML Result, Gran, stavebna technika, logisticke sluzby, medzinarodna doprava, Dobsina, Vlachovo, Slovensko",
  authors: [{ name: "ML Result s.r.o. & Gran s.r.o." }],
  robots: "index, follow",
  openGraph: {
    title: "ML Result & Gran - Doprava, Stavebnictvo, Ocelove Konstrukcie",
    description: "Spolahlivy slovenske spolocnosti s 25+ rokmi skusenosti v doprave, stavebnictve a ocelovych konstrukciach.",
    type: "website",
    url: "https://mlresult.sk",
    images: [{ url: "https://mlresult.sk/images/logos/whole.png" }],
    locale: "sk_SK",
    siteName: "ML Result & Gran",
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Result & Gran - Doprava, Stavebnictvo, Ocelove Konstrukcie",
    description: "Spolahlivy slovenske spolocnosti s 25+ rokmi skusenosti v doprave, stavebnictve a ocelovych konstrukciach.",
    images: ["https://mlresult.sk/images/logos/whole.png"],
  },
  icons: {
    icon: "/images/logos/whole.png",
    apple: "/images/logos/whole.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ML Result & Gran",
              "url": "https://mlresult.sk",
              "logo": "https://mlresult.sk/images/logos/whole.png",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+421908527419",
                  "contactType": "customer service",
                  "email": "obchod@mlresult.sk",
                  "areaServed": "SK",
                  "availableLanguage": "Slovak"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+421907456963",
                  "contactType": "sales",
                  "email": "info@gran-stav.sk",
                  "areaServed": "SK",
                  "availableLanguage": "Slovak"
                }
              ],
              "description": "Sme stabilná slovenská spoločnosť s dlhoročnou praxou v doprave, stavebníctve a prenájme techniky."
            })
          }}
        />
      </head>
      <body className={montserrat.className}>
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
