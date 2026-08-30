import type { Metadata } from "next";
import {
  ArboristLogo,
  consultationMailto,
  reportVerificationMailto,
} from "@/components/ConsultBranding";
import { BadgeCheck, FileCheck2, Mail } from "lucide-react";
import { getSupabaseReadClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Verify Report",
  description:
    "Verify a Peter Toler arborist assessment report or consultation record."
};

type SearchParams = Promise<{ code?: string }>;

type ConsultationReport = {
  verification_code: string;
  report_title: string | null;
  consultation_type: string | null;
  public_client_label: string | null;
  public_property_reference: string | null;
  issued_at: string | null;
  report_hash: string | null;
  hash_algorithm: string | null;
};

async function findReport(code: string) {
  if (!code) return { status: "idle" as const };

  const supabase = getSupabaseReadClient();
  if (!supabase) return { status: "not-configured" as const };

  const { data, error } = await supabase
    .from("consultation_reports")
    .select(
      "verification_code,report_title,consultation_type,public_client_label,public_property_reference,issued_at,report_hash,hash_algorithm"
    )
    .eq("verification_code", code)
    .limit(1);

  if (error) return { status: "error" as const };

  const report = Array.isArray(data) ? (data[0] as ConsultationReport | undefined) : undefined;
  return report ? { status: "found" as const, report } : { status: "not-found" as const };
}

export default async function VerifyReportPage({
  searchParams
}: {
  searchParams?: SearchParams;
}) {
  const params = searchParams ? await searchParams : {};
  const code = typeof params.code === "string" ? params.code.trim() : "";
  const result = await findReport(code);

  return (
    <div className="bg-[#f7f8f0] text-stone-900">
      <section className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.55fr)] lg:items-center lg:px-8">
          <div>
            <ArboristLogo className="mb-6" />
            <h1 className="text-4xl font-black uppercase leading-none tracking-[0.08em] text-emerald-950 sm:text-5xl">
              Report Verification
            </h1>
            <p className="mt-5 text-3xl font-black text-stone-900">Peter Toler</p>
            <p className="mt-2 text-xl font-black text-emerald-800">
              ISA Certified Arborist
            </p>
            <h2 className="mt-8 text-2xl font-black leading-tight text-emerald-950 sm:text-3xl">
              Verify an Assessment Report
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-stone-700">
              Enter the verification code provided with a report to confirm that a matching record exists in Peter Toler&apos;s report system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={consultationMailto}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-900/20 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring"
              >
                <Mail className="size-4 text-emerald-800" aria-hidden="true" />
                Request a Tree Assessment
              </a>
            </div>
          </div>

          <div className="rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-6">
            <form action="/verify" className="space-y-4">
              <div>
                <label htmlFor="code" className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                  Report code
                </label>
                <input
                  id="code"
                  name="code"
                  defaultValue={code}
                  className="mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/15"
                  placeholder="Enter report verification code"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 focus-ring"
              >
                <FileCheck2 className="size-4" aria-hidden="true" />
                Verify Report
              </button>
            </form>
            <div className="mt-6">
              {result.status === "found" ? (
                <div className="rounded-md border border-emerald-800/20 bg-white p-4 text-sm leading-6 text-stone-700">
                  <p className="font-black text-emerald-950">
                    Report record found
                  </p>
                  <dl className="mt-3 space-y-2">
                    <div>
                      <dt className="font-black text-stone-900">Report</dt>
                      <dd>{result.report.report_title ?? "Consultation report"}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-stone-900">Consultation type</dt>
                      <dd>{result.report.consultation_type ?? "Professional tree consultation"}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-stone-900">Issued</dt>
                      <dd>{result.report.issued_at ? new Date(result.report.issued_at).toLocaleDateString("en-US") : "Date not listed"}</dd>
                    </div>
                    <div>
                      <dt className="font-black text-stone-900">Verification status</dt>
                      <dd>Matching report record confirmed</dd>
                    </div>
                    {result.report.report_hash ? (
                      <div>
                        <dt className="font-black text-stone-900">Document integrity reference</dt>
                        <dd className="break-all font-mono text-xs">{result.report.report_hash}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              ) : null}
              {result.status === "not-found" ? (
                <p className="rounded-md border border-amber-300/60 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  No matching report record was found for that code.
                </p>
              ) : null}
              {result.status === "not-configured" ? (
                <p className="rounded-md border border-amber-300/60 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  Online report lookup is temporarily unavailable. Use manual verification below.
                </p>
              ) : null}
              {result.status === "error" ? (
                <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-950">
                  Report lookup could not be completed. Use manual verification if the code should exist.
                </p>
              ) : null}
            </div>
            <a
              href={reportVerificationMailto}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-900/20 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring"
            >
              <Mail className="size-4 text-emerald-800" aria-hidden="true" />
              Request Manual Verification
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8f0] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-emerald-950/10 bg-white p-6">
            <BadgeCheck className="size-10 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-emerald-950">
              Professional report confirmation.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone-700">
              Verification confirms that the submitted code matches a report record maintained for Peter Toler&apos;s arborist consulting work. For questions about a report, use the manual verification option above.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
