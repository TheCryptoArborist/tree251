import { submitConsultationRequest } from "@/app/actions";
import { CheckCircle2, Send } from "lucide-react";

const inputClass =
  "mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/15";

const labelClass = "text-sm font-black text-emerald-950";

const propertyTypes = [
  "Single-family residential",
  "Commercial property",
  "Rental or investment property",
  "HOA or neighborhood common area",
  "Institutional property",
  "Other"
];

const serviceInterests = [
  "Tree Inventory",
  "Tree Risk Assessment",
  "Tree Maintenance Recommendations",
  "Tree Health Assessment",
  "Storm Damage Evaluation",
  "Second Opinion Before Tree Work",
  "Permit or Tree Commission Guidance"
];

const assessmentHandling = [
  "Schedule an appointment for a site visit. I would like to discuss the issues in person.",
  "Schedule a specific time for the site visit, but no one will be there to meet you.",
  "Come by any time. I do not need to be there when you come by.",
  "Online assessment from photos and details."
];

export function ConsultationRequestForm() {
  return (
    <form
      action={submitConsultationRequest}
      className="rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-5 shadow-[0_18px_42px_rgba(25,50,35,0.08)]"
    >
      <input type="hidden" name="source_path" value="/#consultation-request" />

      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
          Assessment request
        </p>
        <h3 className="mt-2 text-2xl font-black text-emerald-950">
          Tell Peter what you are deciding.
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-700">
          Share contact details, property type, the tree concern, photos if available, and how you
          want the assessment handled.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input className={inputClass} name="full_name" autoComplete="name" required />
        </label>
        <label className={labelClass}>
          Email
          <input className={inputClass} name="email" type="email" autoComplete="email" required />
        </label>
        <label className={labelClass}>
          Phone number
          <input className={inputClass} name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className={labelClass}>
          Property type
          <select className={inputClass} name="property_type" defaultValue="" required>
            <option value="" disabled>
              Select one
            </option>
            {propertyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>

      <label className={`${labelClass} mt-4 block`}>
        Address where the consultation will occur
        <input className={inputClass} name="property_address" autoComplete="street-address" />
      </label>

      <fieldset className="mt-5 rounded-md border border-emerald-950/10 bg-white p-4">
        <legend className="px-1 text-sm font-black text-emerald-950">
          What kind of arborist guidance are you interested in?
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {serviceInterests.map((interest) => (
            <label
              key={interest}
              className="flex min-h-12 items-start gap-3 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-3 text-sm font-bold leading-5 text-stone-700"
            >
              <input
                type="checkbox"
                name="consultation_type"
                value={interest}
                className="mt-0.5 size-5 shrink-0 rounded border-emerald-900/30 text-emerald-800"
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${labelClass} mt-4 block`}>
        Please list any specific concerns you have
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name="tree_concern"
          required
          placeholder="Describe the tree, visible concern, and what you are being asked to approve or decide."
        />
      </label>

      <fieldset className="mt-5 rounded-md border border-emerald-950/10 bg-white p-4">
        <legend className="px-1 text-sm font-black text-emerald-950">
          How would you like to handle the assessment?
        </legend>
        <div className="mt-3 space-y-2">
          {assessmentHandling.map((option) => (
            <label
              key={option}
              className="flex min-h-12 items-start gap-3 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-3 text-sm font-bold leading-5 text-stone-700"
            >
              <input
                type="radio"
                name="assessment_handling"
                value={option}
                className="mt-0.5 size-5 shrink-0 border-emerald-900/30 text-emerald-800"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${labelClass} mt-4 block`}>
        Urgency
        <select className={inputClass} name="urgency" defaultValue="Standard assessment">
          <option>Standard assessment</option>
          <option>Time-sensitive decision</option>
          <option>Storm damage concern</option>
          <option>Insurance, legal, HOA, or permit deadline</option>
        </select>
      </label>

      <label className={`${labelClass} mt-4 block`}>
        Please provide any additional details
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          name="decision_context"
          placeholder="Example: tree service recommendation, storm cleanup, neighbor concern, permit question, insurance claim, property sale."
        />
      </label>

      <div className="mt-5 rounded-md border border-emerald-950/10 bg-white p-4 text-sm leading-6 text-stone-700">
        <label className="flex gap-3">
          <input
            type="checkbox"
            name="has_photos"
            className="mt-1 size-5 shrink-0 rounded border-emerald-900/30 text-emerald-800"
          />
          <span>If possible, I can provide pictures that may be helpful.</span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 focus-ring"
      >
        Submit Request
        <Send className="size-4" aria-hidden="true" />
      </button>

      <p className="mt-4 flex gap-2 text-xs leading-5 text-stone-600">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-800" aria-hidden="true" />
        Peter does not sell tree removal or pruning work. The request is for independent arborist
        guidance before you pay for tree work.
      </p>
    </form>
  );
}
