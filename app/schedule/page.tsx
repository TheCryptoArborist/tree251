import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { calendlySchedulingUrl } from "@/components/ConsultBranding";

export const metadata: Metadata = {
  title: "Schedule Phone Consultation",
  description:
    "Schedule a 30-minute phone consultation with Peter Toler, ISA Certified Arborist in Mobile, Alabama."
};

export default function SchedulePage() {
  redirect(calendlySchedulingUrl);
}
