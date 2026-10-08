import { createRouter as createTanStackRouter, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    // [Router] Shown when a loader takes longer than 1s (defaultPendingMs)
    defaultPendingComponent: () => (
      <p className="animate-pulse py-16 text-center font-display text-3xl uppercase text-white/50">Loading…</p>
    ),
    // [Router] Shown when a loader or component throws
    defaultErrorComponent: ErrorPage,
  })

  return router
}

function ErrorPage({ error }: ErrorComponentProps) {
  const router = useRouter()
  return (
    <section className="py-16 text-center">
      <h1 className="font-display text-5xl uppercase">Something went wrong</h1>
      <p className="mt-3 text-white/60">{error instanceof Error ? error.message : String(error)}</p>
      {/* [Router] invalidate() re-runs the loaders and resets the error boundary */}
      <button
        type="button"
        onClick={() => router.invalidate()}
        className="mt-8 rounded-full bg-neon px-6 py-3 font-bold text-ink"
      >
        Try again
      </button>
    </section>
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
