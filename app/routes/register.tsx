import type { ActionFunction } from "@remix-run/node"
import type { RegisterForm } from "utils/types.server"
import { json } from "@remix-run/node"
import { FormField } from "~/components/form-field"
import { Form, Link, useActionData } from "@remix-run/react"
import {
  validateEmail,
  validateName,
  validatePassword,
} from "utils/validators.server"
import { register } from "utils/auth.server"

type ActionData = {
  errors?: string
  form?: RegisterForm
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  // const form = await request.formData()
  // const email = form.get("email")
  // const password = form.get("password")
  // let name = form.get("name")
  const { name, email, password } = Object.fromEntries(await request.formData())

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string"
  ) {
    return json(
      { errors: `Invalid Form Data`, fields: { name, email, password } },
      { status: 400 }
    )
  }

  // TODO: validation - https://github.com/remix-run/remix-jokes/blob/main/app/routes/jokes/new.tsx#L41
  // TODO: validation - https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-2-ZTmOy58p4re8#handle-the-login-and-register-form-submissions
  // const errors = {
  //   email: validateEmail(email),
  //   password: validatePassword(password),
  //   name: validateName((name as string) || ""),
  // }

  // console.log("errors", errors);

  // if (Object.values(errors).some(Boolean)) {
  //   return json(
  //     {
  //       errors,
  //       fields: { name, email, password },
  //     },
  //     { status: 400 }
  //   )
  // }

  // name = name as string
  return await register({ email, password, name })
}

export default function Register() {
  // const actionData = useActionData<ActionData | undefined>()

  return (
    <div className="h-full justify-center items-center flex flex-col gap-y-4">
      <h2 className="text-5xl font-extrabold">
        Register
      </h2>
      <p className="font-semibold text-slate-300">Lorem ipsum</p>

      <Form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
        <FormField htmlFor="name" type="text" label="Name" />
        <FormField htmlFor="email" label="Email" />
        <FormField htmlFor="password" type="password" label="Password" />

        <div className="w-full text-center">
          <input
            type="submit"
            className="rounded-xl mt-2 bg-slate-300 px-3 py-2 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
            value="Register"
          />
        </div>
      </Form>

      <Link to="/login">Login</Link>
    </div>
  )
}
