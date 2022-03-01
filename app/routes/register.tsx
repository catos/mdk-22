import { ActionFunction, Form, Link, useActionData } from "remix"
import { supabaseClient } from "~/utils/db.server";
import { createUserSession } from "~/utils/session.server";

type ActionData = {
  error?: string
  form?: { username: string; password: string };
};

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {

  let { username, password } = Object.fromEntries(
    await request.formData()
  );

  if (typeof username !== "string" || username.length < 3) {
    return { error: "Username must be at least 3 characters long" }
  }

  if (typeof password !== "string" || password.length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  const { user, error } = await supabaseClient.auth.signUp({
    email: username,
    password,
  });

  if (!error && user) {
    return createUserSession(user.id, "/")
  }

  return { error: JSON.stringify(error) }
}

export default function Register() {
  const actionData = useActionData<ActionData | undefined>()

  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Register</h1>
        <Form method="post">
          <div>
            <label htmlFor="username-input">Username</label>
            <input
              type="text"
              id="username-input"
              name="username"
              defaultValue={actionData?.form?.username}
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
                {actionData.error}
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