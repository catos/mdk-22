import { prisma } from "./prisma.server"

export const getRecipes = async () => {
  return await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      author: {
        select: {
          profile: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    } 
  })
}

// TODO: select and limit on getRecipes
// export const getFilteredKudos = async (
//   userId: string,
//   sortFilter: Prisma.KudoOrderByWithRelationInput,
//   whereFilter: Prisma.KudoWhereInput,
// ) => {
//   return await prisma.kudo.findMany({
//     select: {
//       id: true,
//       style: true,
//       message: true,
//       author: {
//         select: {
//           profile: true,
//         },
//       },
//     },
//     orderBy: {
//       ...sortFilter,
//     },
//     where: {
//       recipientId: userId,
//       ...whereFilter,
//     },
//   })
// }

export const getRecipeById = async (recipeId: string) => {
  return await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
  })
}

export type RecipeCreateForm = {
  name: string
  description: string
  ingredients: string
  steps: string
  source: string
  image: string
  time: number
  authorId: string
}

export const createRecipe = async ({
  name,
  description,
  ingredients,
  steps,
  source,
  image,
  time,
  authorId,
}: RecipeCreateForm) => {
  await prisma.recipe.create({
    data: {
      name,
      description,
      ingredients,
      steps,
      source,
      image,
      time,
      published: false,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  })
}
