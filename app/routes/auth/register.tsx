import { ActionFunction, json } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import Input from "~/components/ui/input";
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
  const transition = useTransition()

  return (
    <div className="container mx-auto max-w-md">
      <Form method="post" className="flex flex-col gap-4">
        <h1>Register</h1>
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

        <Input
          name="name"
          label="Navn"
          type="text"
          defaultValue={actionData?.form?.name} />

        <Input
          name="avatar"
          label="Avatar"
          type="text"
          defaultValue={actionData?.form?.avatar} />


        <div id="form-error-message">
          {actionData?.error ? (
            <p className="form-validation-error" role="alert">
              {actionData.error}
            </p>
          ) : null}
        </div>

        <button className="button-primary" type="submit">
          {transition.submission ? "Registrerer..." : "Registrer"}
        </button>

        <section>
          Har du bruker allerede ? <Link className="" to="/logg-inn">Logg inn her</Link>
        </section>

      </Form>
    </div>
  )

}