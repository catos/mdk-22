import { Link } from "@remix-run/react"
import { LoaderFunction, redirect } from "@remix-run/node"
import { isAuthenticated } from "~/utils/auth";

export const loader: LoaderFunction = async ({ request }) => {
  const authenticated = await isAuthenticated(request, true);

  if (!authenticated) {
    return redirect("/login");
  }

  return null
}

export default function Protected() {
  return (
    <>
      <h1>Protected route</h1>
      <p>This route should be protected</p>
      <div>
        <Link to="/">Back home</Link>
      </div>
    </>
  )
}