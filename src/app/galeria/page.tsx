import { Metadata } from "next";
import GaleriaPageClient from "@/components/pages/GaleriaPageClient";

export const metadata: Metadata = {
  title: "Galéria projektov | ML Result & Gran",
  description: "Prezrite si naše zrealizované projekty v oblasti stavebníctva, dopravy a oceľových konštrukcií po celom Slovensku.",
};

export default function GaleriaPage() {
  return <GaleriaPageClient />;
}
