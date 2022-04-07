import { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { isAuthenticated } from "~/utils/auth";

export const loader: LoaderFunction = async ({ request }) => {
  return await isAuthenticated(request, true);
}

export default function Index() {
  const user = useLoaderData()

  return (
    <div>
      <h1>Welcome to MDK</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/protected">Protected</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Form action='/logout' method='post'>
          <button type="submit">Logout</button>
        </Form></li>
      </ul>

      <h2>Remix docs</h2>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
