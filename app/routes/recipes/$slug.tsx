import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getRecipeById } from "utils/recipes.server"

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params

  if (typeof slug !== "string") {
    return redirect("/")
  }

  const recipe = await getRecipeById(slug)

  return json({ recipe })
}

export default function Recipe() {
  const data = useLoaderData()
  return <h2> Recipe with slug: {JSON.stringify(data)} </h2>
}
