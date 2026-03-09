import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mlresult.sk"),
  alternates: {
    canonical: "/",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "ML RESULT s.r.o.",
                "url": "https://mlresult.sk",
                "logo": "https://mlresult.sk/images/logos/image.png",
                "image": "https://mlresult.sk/images/logos/image.png",
                "telephone": "+421908527419",
                "email": "obchod@mlresult.sk",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Niže Mesta 12072",
                  "addressLocality": "Dobšiná",
                  "postalCode": "049 25",
                  "addressCountry": "SK"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 48.8111,
                  "longitude": 20.3888
                },
                "areaServed": "SK",
                "priceRange": "$$",
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "07:00",
                  "closes": "16:00"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "GRAN s.r.o.",
                "url": "https://mlresult.sk",
                "logo": "https://mlresult.sk/images/logos/gran.png",
                "image": "https://mlresult.sk/images/logos/gran.png",
                "telephone": "+421907456963",
                "email": "info@gran-stav.sk",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "SNP 246",
                  "addressLocality": "Vlachovo",
                  "postalCode": "049 24",
                  "addressCountry": "SK"
                },
                "areaServed": "SK",
                "priceRange": "$$",
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "07:00",
                  "closes": "16:00"
                }
              }
            ])
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Nákladná doprava",
                "provider": { "@type": "Organization", "name": "ML RESULT s.r.o." },
                "areaServed": { "@type": "Country", "name": "Slovensko" },
                "description": "Medzinárodná a vnútroštátna nákladná doprava, logistické služby a správa vozového parku."
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Oceľové konštrukcie",
                "provider": { "@type": "Organization", "name": "ML RESULT s.r.o." },
                "areaServed": { "@type": "Country", "name": "Slovensko" },
                "description": "Montáž a výroba montovaných oceľových konštrukcií pre priemyselné a komerčné stavby."
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Stavebníctvo",
                "provider": { "@type": "Organization", "name": "GRAN s.r.o." },
                "areaServed": { "@type": "Country", "name": "Slovensko" },
                "description": "Výstavba diaľníc, infraštruktúrne projekty a komplexné stavebné práce."
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Prenájom stavebnej techniky",
                "provider": { "@type": "Organization", "name": "GRAN s.r.o." },
                "areaServed": { "@type": "Country", "name": "Slovensko" },
                "description": "Prenájom stavebných strojov a techniky - Manitou, Liebherr, New Holland a kvalifikovaní operátori."
              }
            ])
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Domov", "item": "https://mlresult.sk" },
                { "@type": "ListItem", "position": 2, "name": "Služby", "item": "https://mlresult.sk/sluzby" },
                { "@type": "ListItem", "position": 3, "name": "Galéria", "item": "https://mlresult.sk/galeria" },
                { "@type": "ListItem", "position": 4, "name": "O nás", "item": "https://mlresult.sk/o-nas" },
                { "@type": "ListItem", "position": 5, "name": "Kontakt", "item": "https://mlresult.sk/kontakt" }
              ]
            })
          }}
        />
      </head>
      <body className={montserrat.className}>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
