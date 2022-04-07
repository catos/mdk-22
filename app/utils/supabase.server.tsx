// TODO: this is not only DB, supabase does more...
import { createClient } from "@supabase/supabase-js";
import { getSession } from "./session.server";

// see documention about using .env variables
// https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error("supabase url || key not found...")
}

// TODO: rename to just "supabase"
export const supabase = createClient(url, key);

/**
 *
 * @param {*} request
 * @returns
 */
export const hasAuthSession = async (request: Request) => {
  let session = await getSession(request.headers.get("Cookie"));

  if (!session.has("access_token")) 
    throw Error("No session");

  supabase.auth.setAuth(session.get("access_token"));
};