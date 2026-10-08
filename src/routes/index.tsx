import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductGrid } from '../components/ProductGrid'
import { getProducts } from '../server/products'

// [Router] File-based routing: src/routes/index.tsx → "/"
export const Route = createFileRoute('/')({
  // [Start] On the first request this runs on the server, so the featured products
  // are already in the HTML (View Source shows them: that's SSR).
  loader: async () => (await getProducts()).filter((p) => p.featured),
  component: Home,
})

function Home() {
  const featured = Route.useLoaderData()
  return (
    <>
      <section className="py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-neon">TanStack Start demo shop</p>
        <h1 className="mt-2 font-display text-6xl uppercase leading-none sm:text-8xl">
          Unleash the <span className="text-neon">flavor</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">
          Fourteen cans, zero real checkout. A small fake shop that shows what TanStack Start adds on
          top of React and a router.
        </p>
        <Link to="/products" className="mt-8 inline-block rounded-full bg-neon px-6 py-3 font-bold text-ink">
          See all flavors
        </Link>
      </section>
      <section className="mt-10">
        <h2 className="mb-6 font-display text-4xl uppercase">Featured</h2>
        <ProductGrid products={featured} />
      </section>
    </>
  )
}
