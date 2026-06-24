import { createClient } from "@supabase/supabase-js";

const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
};

function getSupabaseUrl() {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function getAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSupabaseAdminClient() {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getServiceRoleKey();
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey, clientOptions);
}

export function getSupabaseRequestClient() {
  const supabaseUrl = getSupabaseUrl();
  const key = getServiceRoleKey() ?? getAnonKey();
  if (!supabaseUrl || !key) return null;
  return createClient(supabaseUrl, key, clientOptions);
}

export function getSupabaseReadClient() {
  const supabaseUrl = getSupabaseUrl();
  const key = getAnonKey() ?? getServiceRoleKey();
  if (!supabaseUrl || !key) return null;
  return createClient(supabaseUrl, key, clientOptions);
}
