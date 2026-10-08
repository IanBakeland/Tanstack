import { createFileRoute } from '@tanstack/react-router'
import { ProductGrid } from '../../components/ProductGrid'
import { getProducts } from '../../server/products'

// [Router] src/routes/products/index.tsx → "/products"
export const Route = createFileRoute('/products/')({
  // [Router] The loader runs before the page renders (on the server for the first request).
  // [Start] getProducts is a server function, so the data never ships in the client bundle.
  loader: () => getProducts(),
  component: Products,
})

function Products() {
  const products = Route.useLoaderData()
  return (
    <section>
      <h1 className="font-display text-5xl uppercase">All flavors</h1>
      <p className="mt-2 mb-8 text-white/70">Filters and sorting come in phase 4.</p>
      <ProductGrid products={products} />
    </section>
  )
}
