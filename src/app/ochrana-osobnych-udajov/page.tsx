import { Metadata } from "next";
import PrivacyPolicyPageClient from "@/components/pages/PrivacyPolicyPageClient";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | ML Result & Gran",
  description: "Zásady ochrany osobných údajov a spracúvania dát v spoločnosti ML Result & Gran v súlade s GDPR.",
};

export default function OchranaOsobnychUdajovPage() {
  return <PrivacyPolicyPageClient />;
}
