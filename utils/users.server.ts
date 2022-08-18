import type { RegisterForm } from "./types.server"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma.server"

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        name: user.name,
      },
    },
  })
  return { id: newUser.id, email: user.email }
}

export const getOtherUsers = async (userId: string) => {
  return prisma.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy: {
      profile: {
        name: "asc",
      },
    },
  })
}

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}
