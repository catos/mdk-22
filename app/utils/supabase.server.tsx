// TODO: this is not only DB, supabase does more...
import { createClient } from "@supabase/supabase-js";

// see documention about using .env variables
// https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error("supabase url || key not found...")
}

export const supabase = createClient(url, key);