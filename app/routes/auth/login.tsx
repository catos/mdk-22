import type { ActionFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams, useTransition } from "@remix-run/react"
import Input from "~/components/ui/input";
import { signInUser } from "~/utils/auth";
import supabaseToken from "~/utils/cookie";

type ActionData = {
  error?: { message: string, status: number }
  form?: { email: string; password: string };
};

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {

  try {
    const form = await request.formData()
    const email = form.get("email")
    const password = form.get("password")
    console.log("hei");

    if (typeof email !== "string" || email.length < 3) {
      return json({ error: "Email must be at least 3 characters long" }, { status: 422 })
    }

    if (typeof password !== "string" || password.length < 6) {
      return json({ error: "Password must be at least 6 characters long" }, { status: 422 })
    }

    const { user, session, error } = await signInUser(
      email,
      password,
    );
    console.log("error", error);


    if (user && session) {
      return redirect("/", {
        headers: {
          "Set-Cookie":
            await supabaseToken.serialize(
              session.access_token,
              {
                // expires: new Date(
                //   session.expires_at
                // ),
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                maxAge: session.expires_in,
              }
            ),
        },
      });
    }

    throw error;
  } catch (error) {
    return json({ error }, { status: 500 })
  }
}

export default function Login() {
  const actionData = useActionData<ActionData | undefined>()
  const transition = useTransition()
  const [searchParams] = useSearchParams()

  return (
    <div className="container mx-auto max-w-md">
      <Form method="post" className="flex flex-col gap-4">
        <h1>Logg inn</h1>
        <Input
          name="redirectTo"
          type="hidden"
          value={searchParams.get("redirectTo") ?? undefined} />

        <Input
          name="email"
          label="E-post"
          type="email"
          defaultValue={actionData?.form?.email} />

        <Input
          name="password"
          label="Passord"
          type="password"
          defaultValue={actionData?.form?.password} />

        <button className="button-primary" type="submit">
          {transition.submission ? "Logger inn..." : "Logg inn"}
        </button>

        <section>
          Har du ikke bruker ? <Link className="" to="/registrer">Registrer deg her</Link>
        </section>

      </Form>

    </div>
  )

}