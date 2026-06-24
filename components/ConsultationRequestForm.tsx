import { submitConsultationRequest } from "@/app/actions";
import { CheckCircle2, Send } from "lucide-react";

const inputClass =
  "mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/15";

const labelClass = "text-sm font-black text-emerald-950";

export function ConsultationRequestForm() {
  return (
    <form
      action={submitConsultationRequest}
      className="rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-5 shadow-[0_18px_42px_rgba(25,50,35,0.08)]"
    >
      <input type="hidden" name="source_path" value="/#consultation-request" />

      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
          Consultation form
        </p>
        <h3 className="mt-2 text-2xl font-black text-emerald-950">
          Request Consultation
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-700">
          Professional arborist consulting first. TREE verification stays optional.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Full name
          <input className={inputClass} name="full_name" autoComplete="name" required />
        </label>
        <label className={labelClass}>
          Email
          <input className={inputClass} name="email" type="email" autoComplete="email" required />
        </label>
        <label className={labelClass}>
          Phone
          <input className={inputClass} name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className={labelClass}>
          Organization
          <input className={inputClass} name="organization" autoComplete="organization" />
        </label>
        <label className={labelClass}>
          Requester type
          <select className={inputClass} name="requester_type" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Homeowner</option>
            <option>Property manager</option>
            <option>Attorney</option>
            <option>Insurance representative</option>
            <option>HOA representative</option>
            <option>Municipality employee</option>
            <option>Commercial property owner</option>
            <option>Other</option>
          </select>
        </label>
        <label className={labelClass}>
          Consultation type
          <select className={inputClass} name="consultation_type" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Tree risk assessment</option>
            <option>Tree health evaluation</option>
            <option>Development or permit consulting</option>
            <option>Storm damage assessment</option>
            <option>Expert recommendation</option>
            <option>Other professional consultation</option>
          </select>
        </label>
      </div>

      <label className={`${labelClass} mt-4 block`}>
        Property address or location
        <input className={inputClass} name="property_address" autoComplete="street-address" />
      </label>

      <label className={`${labelClass} mt-4 block`}>
        Urgency
        <select className={inputClass} name="urgency" defaultValue="Standard consultation">
          <option>Standard consultation</option>
          <option>Time-sensitive decision</option>
          <option>Storm damage concern</option>
          <option>Insurance, legal, or permit deadline</option>
        </select>
      </label>

      <label className={`${labelClass} mt-4 block`}>
        Tree concern
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name="tree_concern"
          required
          placeholder="Describe the tree, visible concern, and what decision you need to make."
        />
      </label>

      <label className={`${labelClass} mt-4 block`}>
        Decision context
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          name="decision_context"
          placeholder="Example: contractor recommendation, insurance claim, HOA review, permit question, sale inspection, storm cleanup."
        />
      </label>

      <div className="mt-5 space-y-3 rounded-md border border-emerald-950/10 bg-white p-4 text-sm leading-6 text-stone-700">
        <label className="flex gap-3">
          <input
            type="checkbox"
            name="has_photos"
            className="mt-1 size-4 rounded border-emerald-900/30 text-emerald-800"
          />
          <span>I have photos available for the consultation.</span>
        </label>
        <label className="flex gap-3">
          <input
            type="checkbox"
            name="wants_tree_verified"
            defaultChecked
            className="mt-1 size-4 rounded border-emerald-900/30 text-emerald-800"
          />
          <span>Include optional TREE Verified report verification if a report is issued.</span>
        </label>
      </div>

      <label className={`${labelClass} mt-4 block`}>
        Optional wallet address for TREE benefits
        <input
          className={inputClass}
          name="wallet_address"
          placeholder="Optional. Not required for consultation or report verification."
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 focus-ring"
      >
        Request Consultation
        <Send className="size-4" aria-hidden="true" />
      </button>

      <p className="mt-4 flex gap-2 text-xs leading-5 text-stone-600">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-800" aria-hidden="true" />
        Cryptocurrency knowledge is not required. Wallet connection is optional and tertiary.
      </p>
    </form>
  );
}
