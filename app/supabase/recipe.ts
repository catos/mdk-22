import { supabase } from "~/utils/supabase.server"

export interface IRecipe {
  id: string
  created_at: Date
  type: number
  time: number
  name: string
  source: string
  image: string
  tags: string
  description: string
  ingredients: string
  steps: string
}

export async function getRecipes() {
  const { data, error } = await supabase.from("recipes").select()

  return data as IRecipe[]
}

export async function getRecipe(slug: string) {
  const id = slug.split("-").at(-1)
  console.log("getRecipe.id: ", id);
  
  const { data, error } = await supabase
    .from("recipes")
    .select()
    .eq("id", id)
    .single()

  return data as IRecipe
}
