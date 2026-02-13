import { Metadata } from "next";
import AboutUsPageClient from "@/components/pages/AboutUsPageClient";

export const metadata: Metadata = {
  title: "O nás | ML Result & Gran - Skúsenosti a Hodnoty",
  description: "Spoznajte našu históriu, hodnoty a víziu. Sme etablovaná spoločnosť s viac ako 25-ročnými skúsenosťami v stavebníctve a doprave.",
};

export default function ONasPage() {
  return <AboutUsPageClient />;
}