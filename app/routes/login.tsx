import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { FormField } from "~/components/form-field"
import { Link } from "@remix-run/react"
import { getUser, login } from "utils/auth.server"

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null
}

export const action: ActionFunction = async ({ request }) => {
  const { email, password } = Object.fromEntries(await request.formData())

  if (typeof email !== "string" || typeof password !== "string") {
    return json(
      { errors: `Invalid Form Data`, fields: { name, email, password } },
      { status: 400 }
    )
  }

  // TODO: validation

  return await login({ email, password })
}

export default function Login() {
  return (
    <div className="h-full justify-center items-center flex flex-col gap-y-4">
      <h2 className="text-5xl font-extrabold">
        Login
      </h2>
      <p className="font-semibold text-slate-300">Lorem ipsum</p>


      <form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
        <FormField htmlFor="email" label="Email" />
        <FormField htmlFor="password" type="password" label="Password" />
        <div className="w-full text-center">
          <input
            type="submit"
            className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
            value="Sign In"
          />
        </div>
      </form>
      <Link to="/register">Register</Link>
    </div>
  )
}
