import { Metadata } from "next";
import SluzbyPageClient from "@/components/pages/SluzbyPageClient";

export const metadata: Metadata = {
  title: "Služby | ML Result & Gran - Doprava a Stavebníctvo",
  description: "Komplexné služby v oblasti nákladnej dopravy, montovaných oceľových konštrukcií, stavebníctva a prenájmu stavebnej techniky.",
};

export default function SluzbyPage() {
  return <SluzbyPageClient />;
}