import { Link } from "@remix-run/react"
import { LoaderFunction, redirect } from "@remix-run/node"
import { isAuthenticated } from "~/utils/auth";

export const loader: LoaderFunction = async ({ request }) => {
  const authenticated = await isAuthenticated(request);

  if (!authenticated) {
    return redirect("/logg-inn");
  }

  return null
}

export default function Admin() {
  return (
    <div className="container mx-auto">
      <h1>Admin route</h1>
      <p>This route should be protected</p>
    </div>
  )
}