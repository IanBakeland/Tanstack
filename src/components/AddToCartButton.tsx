import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { addToCart } from '../server/cart'

export function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter()
  // [Start] useServerFn wraps a server function for use in a component
  const add = useServerFn(addToCart)
  const [pending, setPending] = useState(false)

  async function handleClick() {
    setPending(true)
    await add({ data: productId })
    // [Router] Re-run the loaders on screen (incl. the root's getCart) so the navbar count updates
    await router.invalidate()
    setPending(false)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="rounded-full bg-neon px-4 py-2 text-sm font-bold text-ink transition hover:brightness-110 active:scale-95 disabled:opacity-60"
    >
      {pending ? 'Adding…' : 'Add to cart'}
    </button>
  )
}
