import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { Navbar } from '../components/Navbar'
import appCss from '../styles.css?url'

// [Router] The root route wraps every page: the shared layout (navbar + footer) lives here.
// [Start] shellComponent renders the full <html> document on the server (SSR).
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Monster Mini Shop',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;800&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  // [Router] Shown for URLs that match no route at all
  notFoundComponent: () => (
    <section className="py-16 text-center">
      <h1 className="font-display text-5xl uppercase">Page not found</h1>
      <Link to="/" className="mt-8 inline-block rounded-full bg-neon px-6 py-3 font-bold text-ink">
        Back home
      </Link>
    </section>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
        <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/50">
          Demo project, not affiliated with Monster Energy. No real products, payments or accounts.
        </footer>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
