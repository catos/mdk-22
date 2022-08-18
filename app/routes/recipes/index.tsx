import type { Recipe } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { getRecipes } from "utils/recipes.server"

export const loader: LoaderFunction = async () => {
  const recipes = await getRecipes()

  return json({ recipes })
}

export default function Index() {
  const { recipes } = useLoaderData()

  return (
    <>
      <h2 className="text-2xl">Recipes</h2>
      {recipes.map((recipe: Recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
        </div>
      ))}
    </>
  )
}
