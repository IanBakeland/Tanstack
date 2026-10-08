import { Link } from '@tanstack/react-router'

// [Router] Every `to` is checked against the generated route tree: a typo is a TS error.
export function Navbar({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="font-display text-2xl tracking-wide">
          MONSTER<span className="text-neon">MINI</span>
        </Link>
        <div className="flex gap-5 text-sm font-semibold uppercase">
          <Link to="/products" className="nav-link">
            Flavors
          </Link>
          <Link to="/checkout" className="nav-link">
            Checkout
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-5 text-sm font-semibold uppercase">
          <Link to="/login" className="nav-link">
            Log in
          </Link>
          <Link to="/checkout" className="rounded-full bg-neon px-3 py-1 font-bold text-ink">
            Cart {cartCount}
          </Link>
        </div>
      </nav>
    </header>
  )
}
