import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getRecipes, IRecipe } from "~/supabase/recipe";
import slugify from "~/utils/slugify";

export const loader: LoaderFunction = async () => {
  return getRecipes()
}

export default function Recipes() {
  const recipes = useLoaderData<IRecipe[]>()

  return (
    <div className="container mx-auto">
      <h1>Oppskrifter</h1>

      <div className="container mx-auto">
        <div className="gap-4 grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">

          {recipes.map(recipe =>
            <Recipe key={recipe.id} recipe={recipe} />
          )}
        </div>
      </div>
    </div>
  )
}

const Recipe = ({ recipe }: { recipe: IRecipe }) => {
  return (
    <Link
      to={`/oppskrifter/${slugify(recipe.name)}-${recipe.id}`}
      className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg"
    >
      <img
        className="w-full h-64 object-cover"
        src={recipe.image}
        alt={recipe.name}
      />
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute right-2 bottom-2 left-2 z-10 text-white uppercase text-center text-base">
        {recipe.name}
      </div>
    </Link>
  )
}