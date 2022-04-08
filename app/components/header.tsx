import { Form, Link } from "@remix-run/react"
import { User } from "@supabase/supabase-js"
import Logo from "./logo"

type Props = {
  user?: User | null
}

export default function Header({ user }: Props) {
  return (
    <header className="fixed z-50 w-full top-0 flex flex-wrap items-center justify-between h-16 bg-gray-100">
      <nav aria-label="Main navigation" className="container mx-auto flex">
        <Link to="/" title="Remix" className="flex-1">
          <Logo />
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/oppskrifter">Oppskrifter</Link>
          <Link to="/">Home</Link>
          <Link to="/protected">Protected</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

          {user ?
            (
              <>
                <Link to="/admin">Admin</Link>
                <span>{user.email}</span>
                <Form action='/logout' method='post'>
                  <button type="submit">Logout</button>
                </Form>
              </>
            )
            : <Link to="/logg-inn">Logg inn</Link>}
        </div>
      </nav>
    </header>
  )
}