import { createCookie } from "remix";


const supabaseToken = createCookie("sb:token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 604_800,
});

export default supabaseToken;