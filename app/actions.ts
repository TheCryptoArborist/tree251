"use server";

import { redirect } from "next/navigation";
import { getSupabaseRequestClient } from "@/lib/supabase/server";

function textField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function textFields(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);
}

export async function submitConsultationRequest(formData: FormData) {
  const fullName = textField(formData, "full_name");
  const email = textField(formData, "email");
  const treeConcern = textField(formData, "tree_concern");
  const serviceInterests = textFields(formData, "consultation_type");

  if (!fullName || !email || !treeConcern) {
    redirect("/confirmation?status=incomplete");
  }

  const supabase = getSupabaseRequestClient();

  if (!supabase) {
    redirect("/confirmation?status=not-configured");
  }

  const selectedServices = serviceInterests.join(", ");
  const shortConsultationType =
    selectedServices.length <= 120
      ? selectedServices
      : `${serviceInterests[0] ?? "Multiple services"} + additional services`;
  const decisionContext = [
    textField(formData, "property_type")
      ? `Property type: ${textField(formData, "property_type")}`
      : "",
    selectedServices ? `Service interests: ${selectedServices}` : "",
    textField(formData, "assessment_handling")
      ? `Assessment handling: ${textField(formData, "assessment_handling")}`
      : "",
    textField(formData, "decision_context")
      ? `Additional details: ${textField(formData, "decision_context")}`
      : ""
  ]
    .filter(Boolean)
    .join("\n\n");

  const { error } = await supabase.from("consultation_requests").insert({
    full_name: fullName,
    email,
    phone: textField(formData, "phone") || null,
    organization: textField(formData, "organization") || null,
    requester_type: textField(formData, "requester_type") || null,
    property_address: textField(formData, "property_address") || null,
    consultation_type: shortConsultationType || null,
    urgency: textField(formData, "urgency") || null,
    tree_concern: treeConcern,
    decision_context: decisionContext || null,
    has_photos: formData.get("has_photos") === "on",
    wants_tree_verified: false,
    wallet_address: null,
    source_path: textField(formData, "source_path") || "/"
  });

  if (error) {
    redirect("/confirmation?status=error");
  }

  redirect("/confirmation?status=received");
}
