import { Link, createFileRoute } from '@tanstack/react-router'
import { AddToCartButton } from '../../components/AddToCartButton'
import { getProduct } from '../../server/products'

// [Router] The $ in the filename makes a typed path param: /products/mango-loco → { productId: 'mango-loco' }
export const Route = createFileRoute('/products/$productId')({
  // [Router] loader gets the typed params and runs before render (on the server for the first request).
  // [Start] getProduct is a server function; it throws notFound() for an unknown id.
  loader: ({ params }) => getProduct({ data: params.productId }),
  // [Router] Rendered instead of `component` when the loader throws notFound().
  notFoundComponent: ProductNotFound,
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  return (
    <section className="grid items-center gap-10 md:grid-cols-2">
      <div
        className="flex justify-center rounded-3xl py-6 md:py-10"
        style={{ background: `radial-gradient(circle at 50% 60%, ${product.color}66, transparent 70%)` }}
      >
        <img
          src={product.image}
          alt={`${product.name} can`}
          width={250}
          height={625}
          className="h-64 w-auto drop-shadow-2xl md:h-[26rem]"
        />
      </div>
      <div>
        <Link to="/products" className="nav-link text-sm font-semibold uppercase">
          ← All flavors
        </Link>
        <p className="mt-6 text-sm font-bold uppercase tracking-widest" style={{ color: product.color }}>
          {product.category}
        </p>
        <h1 className="font-display text-5xl uppercase sm:text-6xl">{product.name}</h1>
        <p className="mt-1 text-lg text-white/60">{product.flavor}</p>
        <p className="mt-6 max-w-md text-white/80">{product.description}</p>
        <div className="mt-8 flex gap-10">
          <div>
            <p className="text-3xl font-extrabold">€{product.price.toFixed(2)}</p>
            <p className="text-xs uppercase text-white/50">Demo price</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">{product.caffeineMg} mg</p>
            <p className="text-xs uppercase text-white/50">Caffeine / 500 ml</p>
          </div>
        </div>
        <div className="mt-8">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </section>
  )
}

function ProductNotFound() {
  const { productId } = Route.useParams()
  return (
    <section className="py-16 text-center">
      <h1 className="font-display text-5xl uppercase">Flavor not found</h1>
      <p className="mt-3 text-white/70">
        There is no flavor called <code className="text-neon">{productId}</code>.
      </p>
      <Link to="/products" className="mt-8 inline-block rounded-full bg-neon px-6 py-3 font-bold text-ink">
        See all flavors
      </Link>
    </section>
  )
}
