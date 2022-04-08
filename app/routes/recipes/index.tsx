import { Link } from "@remix-run/react";

export default function Recipes() {
  return (
    <div className="container mx-auto">
      <h1>Oppskrifter</h1>

      <Link to="/oppskrifter/en-oppskrift">En oppskrift</Link>
    </div>
  )
}