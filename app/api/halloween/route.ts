import { createClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_FIELDS, validateHome } from "@/lib/halloween";
export const dynamic = "force-dynamic";
function db(token?: string) {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("The neighborhood map is temporarily unavailable. Please try again later.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: token ? { "x-cromwell-edit-hash": createHash("sha256").update(token).digest("hex") } : {} } });
}
const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
export async function GET() {
  try {
    const { data, error } = await db().from("cromwell_halloween_2026").select(PUBLIC_FIELDS).order("address").limit(1000);
    if (error) throw error;
    return reply({ homes: data });
  } catch { return reply({ error: "Unable to load the neighborhood map. Please retry." }, 503); }
}
async function mutate(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    // Netlify may rewrite the internal request host; validate the public origin directly.
    const allowedOrigins = new Set(["https://www.tree251.xyz", "https://tree251.xyz"]);
    for (const configured of [process.env.URL, process.env.DEPLOY_PRIME_URL]) {
      if (configured) { try { allowedOrigins.add(new URL(configured).origin); } catch {} }
    }
    if (process.env.NODE_ENV !== "production") allowedOrigins.add(req.nextUrl.origin);
    if (origin && !allowedOrigins.has(origin)) return reply({ error: "Please reopen tree251.xyz/halloween and try again." }, 403);
    const raw = await req.text();
    if (raw.length > 4096) return reply({ error: "Submission is too large." }, 413);
    const body = JSON.parse(raw);
    if (body.website) return reply({ error: "Unable to accept this submission." }, 400);
    if (req.method === "POST") {
      if (body.consent !== true) return reply({ error: "Please confirm that you want your address shown on the public map." }, 400);
      const entry = validateHome(body);
      const token = randomBytes(32).toString("hex");
      const { data, error } = await db(token).from("cromwell_halloween_2026").insert({ ...entry, edit_hash: createHash("sha256").update(token).digest("hex") }).select(PUBLIC_FIELDS).single();
      if (error) return reply({ error: error.code === "23505" ? "That address is already listed. Use your saved edit link or the Manage button on the device you used to add it." : "Unable to save your house. Please retry." }, error.code === "23505" ? 409 : 503);
      return reply({ home: data, token }, 201);
    }
    const token = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
    if (!/^[a-f0-9]{64}$/.test(token) || typeof body.id !== "string" || !/^[a-f0-9-]{36}$/.test(body.id)) return reply({ error: "Open your private edit link to manage this house." }, 403);
    const client = db(token);
    if (req.method === "DELETE") {
      const { data, error } = await client.from("cromwell_halloween_2026").delete().eq("id", body.id).select("id");
      if (error || !data?.length) return reply({ error: "Unable to remove this house. Check your edit link." }, 403);
      return reply({ removed: true });
    }
    const entry = validateHome(body);
    const { data, error } = await client.from("cromwell_halloween_2026").update({ status: entry.status, hours: entry.hours, notes: entry.notes }).eq("id", body.id).select(PUBLIC_FIELDS).maybeSingle();
    if (error || !data) return reply({ error: "Unable to update this house. Check your edit link." }, 403);
    return reply({ home: data });
  } catch (e) { return reply({ error: e instanceof Error ? e.message : "Invalid submission." }, 400); }
}
export const POST = mutate;
export const PATCH = mutate;
export const DELETE = mutate;
