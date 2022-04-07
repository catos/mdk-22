import { supabase } from "./supabase.server"
import supabaseToken from "~/utils/cookie"

export interface IUser {
  email: string
  password: string
  name: string
  avatar: string
}

export const createUser = async (data: IUser) => {
  const { user, error } = await supabase.auth.signUp({
    email: data?.email,
    password: data?.password,
  })

  const createProfile = await supabase.from("profiles").upsert({
    id: user?.id,
    name: data?.name,
    avatar: data?.avatar,
  })

  return { user: createProfile, error }
}

export const signInUser = async (email: string, password: string) => {
  return await supabase.auth.signIn({
    email,
    password,
  })
}

const getToken = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie")
  return await supabaseToken.parse(cookieHeader)
}

const getUserByToken = async (token: string) => {
  supabase.auth.setAuth(token)
  const { user, error } = await supabase.auth.api.getUser(token)
  return { user, error }
}

export const isAuthenticated = async (
  request: Request,
  validateAndReturnUser = false
) => {
  const token = await getToken(request)

  if (!token && !validateAndReturnUser) return false

  if (validateAndReturnUser) {
    const { user, error } = await getUserByToken(token)
    if (error) {
      return false
    }
    return { user }
  }

  return true
}

export const getUserData = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single()
  return { data, error }
}

export const signOutUser = async (request: Request) => {
  const token = await getToken(request)
  return await supabase.auth.api.signOut(token)
}
