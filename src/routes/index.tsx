import { createFileRoute } from '@tanstack/react-router'

// [Router] File-based routing: src/routes/index.tsx → "/"
export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <section>
      <h1 className="font-display text-6xl uppercase sm:text-8xl">
        Unleash the <span className="text-neon">flavor</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-white/70">
        A tiny fake shop to show off TanStack Start. Featured flavors arrive in phase 3.
      </p>
    </section>
  )
}
