import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
};

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey, clientOptions);
}

export function getSupabaseReadClient() {
  const key = anonKey ?? serviceRoleKey;
  if (!supabaseUrl || !key) return null;
  return createClient(supabaseUrl, key, clientOptions);
}
