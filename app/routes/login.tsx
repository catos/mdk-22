import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react"
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

  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Login</h1>
        <Form method="post">
          <div>
            <label htmlFor="email-input">Email</label>
            <input
              type="text"
              id="email-input"
              name="email"
              defaultValue={actionData?.form?.email}
            />
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              name="password"
              defaultValue={actionData?.form?.password}
              type="password"
            />
          </div>
          <div id="form-error-message">
            {actionData?.error ? (
              <p className="form-validation-error" role="alert">
                {actionData.error.message}
              </p>
            ) : null}
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </Form>
      </div>
      <br />
      <div>
        <Link to="/">Back home</Link>
      </div>
    </div>
  )

}