import { createCookieSessionStorage, redirect } from "remix";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

//
// lifted directly from the remix documentation
// https://remix.run/docs/en/v1/api/remix#sessions
//
const ttl = 24 * 60 * 60 // hours * minutes * seconds

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "mdk_session",

      // all of these are optional
      expires: new Date(Date.now() + ttl * 1000),
      httpOnly: true,
      maxAge: ttl,
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
      // secure: true,
    },
  });

export { getSession, commitSession, destroySession };

export async function createUserSession(userId: string, redirectTo: string) {
  let session = await getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}