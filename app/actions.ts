"use server";

import { redirect } from "next/navigation";
import { getSupabaseRequestClient } from "@/lib/supabase/server";

function textField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitConsultationRequest(formData: FormData) {
  const fullName = textField(formData, "full_name");
  const email = textField(formData, "email");
  const treeConcern = textField(formData, "tree_concern");

  if (!fullName || !email || !treeConcern) {
    redirect("/confirmation?status=incomplete");
  }

  const supabase = getSupabaseRequestClient();

  if (!supabase) {
    redirect("/confirmation?status=not-configured");
  }

  const { error } = await supabase.from("consultation_requests").insert({
    full_name: fullName,
    email,
    phone: textField(formData, "phone") || null,
    organization: textField(formData, "organization") || null,
    requester_type: textField(formData, "requester_type") || null,
    property_address: textField(formData, "property_address") || null,
    consultation_type: textField(formData, "consultation_type") || null,
    urgency: textField(formData, "urgency") || null,
    tree_concern: treeConcern,
    decision_context: textField(formData, "decision_context") || null,
    has_photos: formData.get("has_photos") === "on",
    wants_tree_verified: formData.get("wants_tree_verified") === "on",
    wallet_address: textField(formData, "wallet_address") || null,
    source_path: textField(formData, "source_path") || "/"
  });

  if (error) {
    redirect("/confirmation?status=error");
  }

  redirect("/confirmation?status=received");
}
