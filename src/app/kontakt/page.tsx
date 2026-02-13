import { Metadata } from "next";
import KontaktPageClient from "@/components/pages/KontaktPageClient";

export const metadata: Metadata = {
  title: "Kontaktujte nás | ML Result & Gran",
  description: "Máte otázky? Napíšte nám alebo nám zavolajte. Kancelárie v Dobšinej a Vlachove sú vám k dispozícii.",
};

export default function KontaktPage() {
  return <KontaktPageClient />;
}
