import { ActionFunction, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { createUser } from "~/utils/auth";

interface IForm {
  email: string
  password: string
  name: string
  avatar: string
}

type ActionData = {
  error?: string
  form?: IForm
};

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  try {
    const form = await request.formData()
    const email = form.get("email")
    const password = form.get("password")
    const name = form.get("name")
    const avatar = form.get("avatar")

    if (typeof email !== "string" || email.length < 3) {
      return json({ error: "Email must be at least 3 characters long" }, { status: 422 })
    }

    if (typeof password !== "string" || password.length < 6) {
      return json({ error: "Password must be at least 6 characters long" }, { status: 422 })
    }

    if (typeof name !== "string" || name.length < 2) {
      return json({ error: "Name must be at least 2 characters long" }, { status: 422 })
    }

    if (typeof avatar !== "string" || avatar.length < 2) {
      return json({ error: "Avatar must be at least 2 characters long" }, { status: 422 })
    }

    const { user, error } = await createUser(
      email,
      password,
      name,
      avatar,
    )

    if (error) {
      // return json({ error }, { status: 500 })
      throw error
    }

    return json({ user }, { status: 200 });

  } catch (error) {
    console.log("error", error);
    return json({ error }, { status: 500 })
  }
}

export default function Register() {
  const actionData = useActionData<ActionData | undefined>()

  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Register</h1>
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
          <div>
            <label htmlFor="name-input">Name</label>
            <input
              id="name-input"
              name="name"
              defaultValue={actionData?.form?.name}
              type="name"
            />
          </div>
          <div>
            <label htmlFor="avatar-input">Avatar</label>
            <input
              id="avatar-input"
              name="avatar"
              defaultValue={actionData?.form?.avatar}
              type="avatar"
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