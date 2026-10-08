import { createFileRoute } from '@tanstack/react-router'

// [Router] The $ in the filename makes a typed path param: /products/mango-loco → { productId: 'mango-loco' }
export const Route = createFileRoute('/products/$productId')({ component: ProductPage })

function ProductPage() {
  const { productId } = Route.useParams()
  return (
    <section>
      <h1 className="font-display text-5xl uppercase">{productId}</h1>
      <p className="mt-2 text-white/70">The loader + not-found page come in phase 3.</p>
    </section>
  )
}
