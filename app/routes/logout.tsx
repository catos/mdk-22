
import type { ActionFunction } from "remix";
import { Form, Link, redirect } from "remix"
import { supabaseClient } from "~/utils/db.server";
import { destroySession, getSession } from "~/utils/session.server";

export const action: ActionFunction = async ({
  request,
}) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  const { error } = await supabaseClient.auth.signOut()

  if (!error) {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return { error: JSON.stringify(error) }
};

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button>Logout</button>
      </Form>
      <Link to="/">Never mind</Link>
    </>
  );
}