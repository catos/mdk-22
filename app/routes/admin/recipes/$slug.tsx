import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import Input from "~/components/ui/input";
import { getRecipe } from "~/supabase/recipe";
import { isAuthenticated } from "~/utils/auth";
import slugify from "~/utils/slugify";
import { supabase } from "~/utils/supabase.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authenticated = await isAuthenticated(request);

  if (!authenticated) {
    return redirect("/logg-inn");
  }

  // TODO: handle !slug properly
  const { slug } = params
  if (!slug) {
    throw new Error("Woot.. slug should not be null at this point ?!?")
  }

  return getRecipe(slug)
}

export const action: ActionFunction = async ({ params, request }) => {

  const form = await request.formData()
  const id = form.get("id")
  const name = form.get("name")
  const image = form.get("image")

  if (typeof name !== "string" || name.length < 3) {
    return json({ error: "Name must be at least 3 characters long" }, { status: 422 })
  }

  const { data, error } = await supabase
    .from("recipes")
    .update({
      name: name,
      image: image
    })
    .eq("id", id)

    console.log(supabase.auth.session());
    
  console.log("Update recipe!", name, id, data, error);

  // return redirect(`/admin/recipes/${slugify(name)}-${id}`)
  return null
}

export default function Recipe() {
  const recipe = useLoaderData()
  const transition = useTransition()

  return (
    <div className="container mx-auto max-w-md">
      <h1>Edit: {recipe.name}</h1>

      <Form method="post" className="flex flex-col gap-4">
        <Input name="id" hidden defaultValue={recipe.id} />
        <Input name="name" label="Name" defaultValue={recipe.name} />
        <Input name="image" label="Image" defaultValue={recipe.image ?? ""} />
        {/* <Input name="source" label="Source" value={recipe.source} />
        <Input name="time" label="time" value={recipe.time} />
        <Input name="type" label="type" value={recipe.type} />
        <Input name="tags" label="tags" value={recipe.tags} /> */}


        {/* <label className="label" htmlFor="ingredients">
          Ingredients
          <textarea className="input h-20" id="ingredients" rows={20} name="ingredients">
            {recipe.ingredients}
          </textarea> */}
        {/* {errors?.markdown && <div>Markdown is required</div>} */}
        {/* </label> */}

        <button className="button-primary" type="submit">
          {transition.submission ? "Lagrer..." : "Lagre"}
        </button>
      </Form>

    </div>)
}