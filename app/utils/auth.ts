import { supabase } from "./supabase.server"
import supabaseToken from "~/utils/cookie"

const getToken = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie")
  return await supabaseToken.parse(cookieHeader)
}

const getUserByToken = async (token: string) => {
  supabase.auth.setAuth(token)
  const { user, error } = await supabase.auth.api.getUser(token)
  return { user, error }
}

export const createUser = async (
  email: string,
  password: string,
  name: string,
  avatar: string
) => {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  const createProfile = await supabase.from("profiles").upsert({
    id: user?.id,
    name: name,
    avatar: avatar,
  })

  return { user: createProfile, error }
}

export const signInUser = async (email: string, password: string) => {
  return await supabase.auth.signIn({
    email,
    password,
  })
}

export const signOutUser = async (request: Request) => {
  const token = await getToken(request)
  return await supabase.auth.api.signOut(token)
}

export const isAuthenticated = async (request: Request) => {
  const token = await getToken(request)
  return Boolean(token)
}

export interface IUser {
  id: string
  email: string
  name?: string
  avatar?: string
}

export async function getUser(request: Request) {
  const token = await getToken(request)

  const { user } = await getUserByToken(token)

  if (!user) {
    return null
  }
  

  const { data: profile } = user
    ? await supabase.from("profiles").select().eq("id", user.id).single()
    : { data: null }

  return { ...user, ...profile } as IUser
}
