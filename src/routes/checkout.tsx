import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout')({ component: Checkout })

function Checkout() {
  return (
    <section>
      <h1 className="font-display text-5xl uppercase">Checkout</h1>
      <p className="mt-2 text-white/70">Cart contents (phase 6) and the login guard (phase 7) come later.</p>
    </section>
  )
}
