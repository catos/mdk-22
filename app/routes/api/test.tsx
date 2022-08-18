import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"

export const loader: LoaderFunction = async ({ request }) => {
  return json({ hello: "there " })
}
