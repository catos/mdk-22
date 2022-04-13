import { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";
import { getRecipe } from "~/supabase/recipe"
import slugify from "~/utils/slugify";

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params

  // TODO: handle !slug properly
  if (!slug) {
    throw new Error("Woot.. slug should not be null at this point ?!?")
  }

  return getRecipe(slug)
}

// TODO: https://github.com/catos/mdk-remix/blob/master/app/routes/recipes/%24slug.tsx
export default function Recipe() {
  const recipe = useLoaderData()

  return (
    <div className="container mx-auto">
      <section className="px-4 sm:px-0">
        <div className="container mx-auto flex flex-col bg-white gap-4">
          <div className="relative h-vh33">
            {/* TODO: only show for admins */}
            <Link
              to={`/admin/recipes/${slugify(recipe.name)}-${recipe.id}`}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center rounded-full"
            >
              {/* <PencilAltIcon className="w-5 h-5" /> */}
              Edit
            </Link>
            {/* <RecipeMetrics recipe={recipe} /> */}
            {recipe.image && (
              <img
                className="container mx-auto object-cover h-vh33 w-full"
                src={recipe.image}
                alt={recipe.name}
              />
            )}
            <div className="text-white absolute bottom-0 text-center w-full bg-black bg-opacity-50 py-4">
              <h1 className="text-white font-serif">{recipe.name}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex flex-wrap justify-center gap-4 p-4 bg-white">
          <button
            aria-label="legg til som favoritt"
            className="button flex flex-row items-center"
          >
            {/* <BookmarkIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">+ Favoritt</div>
          </button>

          <button
            aria-label="legg til meny"
            className="button flex flex-row items-center"
          >
            {/* <BookOpenIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">+ Meny</div>
          </button>

          <button
            aria-label="print"
            className="button flex flex-row items-center"
          >
            {/* <PrinterIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">Print</div>
          </button>

          <button
            aria-label="last ned"
            className="button flex flex-row items-center"
          >
            {/* <SaveIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">Lagre</div>
          </button>

          {recipe.source ? (
            <a
              href={recipe.source}
              className="button flex flex-row items-center"
            >
              <div className="pl-2 hidden lg:block">Kilde</div>
            </a>
          ) : null}
        </div>
      </section>

      {recipe.description ? (
        <section className="hidden lg:block container mx-auto px-4 sm:px-0 bg-white text-center">
          <RecipeMarkdown markdown={recipe.description} />
        </section>
      ) : null}

      <section className="container mx-auto px-4 sm:px-0 bg-white flex flex-col sm:flex-row gap-4">
        {recipe.ingredients && <div className="sm:w-1/2 xl:w-5/12">
          <div className="p-2 text-lg uppercase bg-gray-100 text-gray-600">
            Ingredienser
          </div>
          <RecipeMarkdown markdown={recipe.ingredients} />
        </div>}

        {recipe.steps && <div className="sm:w-1/2 xl:w-7/12">
          <div className="p-2 text-lg uppercase bg-gray-100 text-gray-600">
            Fremgangsmåte
          </div>
          <RecipeMarkdown markdown={recipe.steps} />
        </div>}
      </section>

      <div>{JSON.stringify(recipe)}</div>

    </div>
  )
}

interface IRecipeMarkdownProps {
  markdown: string
}

function RecipeMarkdown({ markdown }: IRecipeMarkdownProps) {
  return (
    <div>{JSON.stringify(markdown)}</div>
  )
}