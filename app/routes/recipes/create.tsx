import type { ActionFunction } from "@remix-run/node"
import type { RecipeCreateForm } from "utils/recipes.server"
import { createRecipe } from "utils/recipes.server"
import { json } from "@remix-run/node"
import { FormField } from "~/components/form-field"
import { requireUserId } from "utils/auth.server"
import { Form } from "@remix-run/react"

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const { name, description, ingredients, steps, source, image, time } =
    Object.fromEntries(await request.formData())

  // TODO: validate form
  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof ingredients !== "string" ||
    typeof steps !== "string" ||
    typeof source !== "string" ||
    typeof image !== "string" ||
    typeof time !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 })
  }

  const newRecipe: RecipeCreateForm = {
    name,
    description,
    ingredients,
    steps,
    source,
    image,
    time: parseInt(time),
    authorId: userId,
  }
  console.log("newRecipe", newRecipe)

  const recipe = await createRecipe(newRecipe)

  return json({ recipe })
}

export default function CreateRecipe() {
  return (
    <div>
      <h1 className="text-5xl font-extrabold">Create</h1>
      <Form method="post" className="flex flex-col gap-2">
        <FormField htmlFor="name" label="name" defaultValue="A new recipe" />
        <FormField
          htmlFor="description"
          label="description"
          defaultValue="Lorem ipsum"
        />
        <FormField htmlFor="ingredients" label="ingredients" />
        <FormField htmlFor="steps" label="steps" />
        <FormField htmlFor="source" label="source" />
        <FormField htmlFor="image" label="image" />
        <FormField htmlFor="time" label="time" defaultValue={60} />

        <input
          type="submit"
          className="rounded-xl mt-2 bg-slate-300 px-3 py-2 font-semibold"
          value="Register"
        />
      </Form>
    </div>
  )
}
