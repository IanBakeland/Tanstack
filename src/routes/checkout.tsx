import { Link, createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { getUser } from '../server/auth'
import { getCart, removeFromCart } from '../server/cart'

export const Route = createFileRoute('/checkout')({
  // [Router] beforeLoad runs before the loader and the page. Throwing redirect() stops the
  // navigation and sends you to /login?redirect=/checkout instead.
  // [Start] getUser is a server function that reads the (fake) user cookie.
  beforeLoad: async ({ location }) => {
    const user = await getUser()
    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
    // [Router] Whatever beforeLoad returns is added to the route context, fully typed
    return { user }
  },
  loader: () => getCart(),
  component: Checkout,
})

function Checkout() {
  const { items, total } = Route.useLoaderData()
  // [Router] `user` is typed as string here because beforeLoad returned it
  const { user } = Route.useRouteContext()

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="font-display text-5xl uppercase">Checkout</h1>
      <p className="mt-2 text-white/70">
        Logged in as <span className="font-bold text-neon">{user}</span>
      </p>
      <p className="mt-1 text-sm text-white/50">Demo only: nothing is ordered or paid.</p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-panel p-8 text-center">
          <p className="text-white/70">Your cart is empty.</p>
          <Link to="/products" className="mt-6 inline-block rounded-full bg-neon px-6 py-3 font-bold text-ink">
            Browse flavors
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-panel">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-4 p-4">
                <img src={product.image} alt="" width={250} height={625} className="h-20 w-auto" />
                <div className="flex-1">
                  <p className="font-display text-xl uppercase">{product.name}</p>
                  <p className="text-sm text-white/60">
                    {quantity} × €{product.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-bold">€{(quantity * product.price).toFixed(2)}</p>
                <RemoveButton productId={product.id} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right text-2xl font-extrabold">Total €{total.toFixed(2)}</p>
        </>
      )}
    </section>
  )
}

function RemoveButton({ productId }: { productId: string }) {
  const router = useRouter()
  const remove = useServerFn(removeFromCart)
  return (
    <button
      type="button"
      onClick={async () => {
        await remove({ data: productId })
        await router.invalidate()
      }}
      className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase text-white/70 hover:border-red-400 hover:text-red-400"
    >
      Remove
    </button>
  )
}
