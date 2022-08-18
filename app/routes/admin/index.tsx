import type { LoaderFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { requireUserId } from "utils/auth.server"

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return null
}

export default function Index() {
  return (
    <>
      <h2 className="text-2xl">Admin index page</h2>
      <p>Its protected!</p>

      <Link to="/recipes/create">Create new recipe</Link>
    </>
  )
}
