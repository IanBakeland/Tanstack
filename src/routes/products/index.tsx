import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductGrid } from '../../components/ProductGrid'
import { getProducts } from '../../server/products'

const categories = ['all', 'ultra', 'juice', 'original', 'other'] as const
const sorts = ['featured', 'price', 'name'] as const

type ProductSearch = {
  category: (typeof categories)[number]
  sort: (typeof sorts)[number]
}

// Returns `value` if it's one of `options`, otherwise undefined.
function oneOf<T extends string>(value: unknown, options: readonly T[]): T | undefined {
  return options.find((option) => option === value)
}

// [Router] src/routes/products/index.tsx → "/products"
export const Route = createFileRoute('/products/')({
  // [Router] validateSearch turns the raw URL query into typed, trusted values.
  // ?sort=banaan → undefined → the default ('featured') instead of crashing or being used as-is.
  // Its type is also what <Link search> accepts, so search={{ sort: 'banaan' }} is a TS error.
  // Fields are optional so a plain <Link to="/products"> doesn't need a search prop.
  validateSearch: (search: Record<string, unknown>): Partial<ProductSearch> => ({
    category: oneOf(search.category, categories),
    sort: oneOf(search.sort, sorts),
  }),
  // [Router] The loader runs before the page renders (on the server for the first request).
  // [Start] getProducts is a server function, so the data never ships in the client bundle.
  loader: () => getProducts(),
  component: Products,
})

function Products() {
  const products = Route.useLoaderData()
  // [Router] Typed search params: category is 'all' | 'ultra' | ..., never a random string.
  const { category = 'all', sort = 'featured' } = Route.useSearch()

  const visible = products
    .filter((p) => category === 'all' || p.category === category)
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price
      if (sort === 'name') return a.name.localeCompare(b.name)
      return Number(b.featured) - Number(a.featured)
    })

  return (
    <section>
      <h1 className="font-display text-5xl uppercase">All flavors</h1>

      <div className="mt-6 mb-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            // [Router] Filters are links that only change the URL; the page re-reads it via useSearch.
            <Link
              key={c}
              to="/products"
              search={(prev) => ({ ...prev, category: c })}
              className={`pill ${c === category ? 'pill-active' : ''}`}
            >
              {c}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase text-white/50">Sort</span>
          {sorts.map((s) => (
            <Link
              key={s}
              to="/products"
              search={(prev) => ({ ...prev, sort: s })}
              className={`pill ${s === sort ? 'pill-active' : ''}`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      <ProductGrid products={visible} />
    </section>
  )
}
