import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLoaderData, useLocation, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { addToCart } from '../server/cart'

export function AddToCartButton({ productId, productName }: { productId: string; productName: string }) {
  const router = useRouter()
  const location = useLocation()
  // [Router] Read the root route's loader data from any component, typed by the route id
  const user = useLoaderData({ from: '__root__', select: (data) => data.user })
  // [Start] useServerFn wraps a server function for use in a component
  const add = useServerFn(addToCart)
  const [pending, setPending] = useState(false)
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null)

  async function handleClick() {
    if (!user) {
      // Log in first, then come back to this exact page (including ?category=… filters)
      await router.navigate({ to: '/login', search: { redirect: location.href } })
      return
    }
    setPending(true)
    try {
      await add({ data: productId })
      setToast({ ok: true, text: productName })
    } catch (e) {
      setToast({ ok: false, text: e instanceof Error ? e.message : 'Could not add to cart' })
    } finally {
      setTimeout(() => setToast(null), 2500)
      // [Router] Re-run the loaders on screen (incl. the root's getCart) so the navbar count updates.
      // Also runs on failure, e.g. an expired login: the navbar then shows "Log in" again.
      await router.invalidate()
      setPending(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="rounded-full bg-neon px-4 py-2 text-sm font-bold text-ink transition hover:brightness-110 active:scale-95 disabled:opacity-60"
      >
        {pending ? 'Adding…' : toast?.ok ? 'Added ✓' : 'Add to cart'}
      </button>
      {toast &&
        createPortal(
          <div role="status" className={`toast ${toast.ok ? '' : 'toast-error'}`}>
            <p className={`text-xs font-bold uppercase tracking-widest ${toast.ok ? 'text-neon' : 'text-red-400'}`}>
              {toast.ok ? '✓ Added to cart' : "✕ Couldn't add"}
            </p>
            <p className="mt-0.5 text-sm font-semibold">{toast.ok ? productName : toast.text}</p>
          </div>,
          // Rendered under the cart pill in the navbar (falls back to <body>)
          document.getElementById('cart-feedback') ?? document.body,
        )}
    </>
  )
}
