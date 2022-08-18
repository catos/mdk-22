import type { User } from "@prisma/client"
import { Link } from "@remix-run/react"

type Props = {
  user?: User
  children: React.ReactNode
}

export default function Layout({ user, children }: Props) {
  return (
    <>
      <Header user={user} />
      <div className="container mx-auto">
        <main className="bg-white py-4">{children}</main>
      </div>
      <Footer />
    </>
  )
}

function Header({ user }: { user: User | undefined }) {
  return (
    <header className="flex gap-2 p-4 bg-slate-200">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/recipes">Recipes</Link>
      {user && (
        <>
          <span>User: {user.profile.name}</span>
          <form action="/logout" method="post">
            <button
              type="submit"
              className="rounded-xl bg-orange-600 text-white font-semibold px-3 py-2"
            >
              Sign Out
            </button>
          </form>
        </>
      )}
    </header>
  )
}

function Footer() {
  return <footer className="p-16 bg-slate-200">Footer</footer>
}
