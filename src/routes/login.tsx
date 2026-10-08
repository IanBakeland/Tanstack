import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({ component: Login })

function Login() {
  return (
    <section>
      <h1 className="font-display text-5xl uppercase">Log in</h1>
      <p className="mt-2 text-white/70">The fake login form comes in phase 7.</p>
    </section>
  )
}
