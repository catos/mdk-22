import { Link } from "@remix-run/react";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 items-center py-8 bg-gray-100">
      <section className="container mx-auto text-center">
        <Logo />
        <p className="mt-4 leading-tight">
          Lorem ipsum dolor amet consectetur, adipisicing elit. Illo maiores
          iure in vitae iusto fuga ratione?
        </p>
      </section>

      <section className="flex gap-8">
        <Link to="/">
          Om oss
        </Link>
        <Link to="/">
          Hjelp
        </Link>
        <Link to="/">
          Vilkår
        </Link>
      </section>

      <section className="text-sm">
        {"Copyright © "}
        <span className="font-bold">ca7o.com</span> {new Date().getFullYear()}
        {"."}
      </section>

    </footer>
  )
}