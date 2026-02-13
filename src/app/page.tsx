import { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";

export const metadata: Metadata = {
  title: "ML Result & Gran | Doprava, Stavebníctvo a Oceľové konštrukcie",
  description: "Váš spoľahlivý partner pre dopravu, výstavbu a technické riešenia na Slovensku. Viac ako 25 rokov skúseností a 200+ úspešných projektov.",
};

export default function Home() {
  return <HomePageClient />;
}
