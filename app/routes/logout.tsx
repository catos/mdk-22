import { ActionFunction, redirect } from "remix";
import supabaseToken from "~/utils/cookie";
import { signOutUser } from "~/utils/auth";

export const action: ActionFunction = async ({ request }) => {
  try {
    await signOutUser(request);
    return redirect("/", {
      headers: {
        "Set-Cookie":
          await supabaseToken.serialize("", {
            maxAge: 0,
          }),
      },
    });
  } catch (error) {
    console.log(error);
  }
}