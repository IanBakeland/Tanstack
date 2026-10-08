import { Link } from '@tanstack/react-router'
import type { Product } from '../server/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-panel p-5 transition duration-300 hover:-translate-y-1 hover:border-white/30">
      {/* [Router] `params` is typed from the route path: leaving out productId is a TS error */}
      <Link to="/products/$productId" params={{ productId: product.id }} className="block">
        <div
          className="flex h-60 items-center justify-center rounded-xl"
          style={{ background: `radial-gradient(circle at 50% 65%, ${product.color}55, transparent 70%)` }}
        >
          <img
            src={product.image}
            alt={`${product.name} can`}
            width={250}
            height={625}
            loading="lazy"
            className="h-56 w-auto drop-shadow-2xl transition duration-300 group-hover:scale-105 group-hover:-rotate-6"
          />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: product.color }}>
          {product.category}
        </p>
        <h3 className="font-display text-2xl uppercase">{product.name}</h3>
        <p className="text-sm text-white/60">{product.flavor}</p>
      </Link>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-lg font-extrabold">€{product.price.toFixed(2)}</span>
        <span className="text-xs text-white/50">{product.caffeineMg} mg caffeine</span>
      </div>
    </article>
  )
}
