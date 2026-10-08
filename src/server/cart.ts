import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { products } from './products'

// The cart lives in a cookie, not in a server variable: on serverless hosts (Vercel)
// every request can hit a fresh server, so in-memory state would disappear.
type Cart = Record<string, number> // productId → quantity

const CART_COOKIE = 'cart'

// The cookie comes from the browser, so treat it as untrusted: keep only known ids and sane quantities.
function readCart(): Cart {
  let raw: unknown
  try {
    raw = JSON.parse(getCookie(CART_COOKIE) ?? '{}')
  } catch {
    return {}
  }
  const cart: Cart = {}
  if (typeof raw !== 'object' || raw === null) return cart
  for (const [id, qty] of Object.entries(raw)) {
    if (products.some((p) => p.id === id) && Number.isInteger(qty) && qty > 0 && qty <= 99) {
      cart[id] = qty
    }
  }
  return cart
}

function writeCart(cart: Cart) {
  // [Start] setCookie only works on the server (inside a server function or route handler).
  setCookie(CART_COOKIE, JSON.stringify(cart), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
}

function validateProductId(id: string) {
  if (!products.some((p) => p.id === id)) throw new Error(`Unknown product: ${String(id)}`)
  return id
}

// [Start] Server functions: the browser calls them like normal async functions,
// Start turns that into a request to the server. The cookie is read and written there.
export const getCart = createServerFn().handler(async () => {
  const cart = readCart()
  const items = products
    .filter((p) => cart[p.id])
    .map((product) => ({ product, quantity: cart[product.id] }))
  return {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
  }
})

export const addToCart = createServerFn({ method: 'POST' })
  .validator(validateProductId)
  .handler(async ({ data: id }) => {
    const cart = readCart()
    cart[id] = Math.min((cart[id] ?? 0) + 1, 99)
    writeCart(cart)
  })

export const removeFromCart = createServerFn({ method: 'POST' })
  .validator(validateProductId)
  .handler(async ({ data: id }) => {
    const cart = readCart()
    delete cart[id]
    writeCart(cart)
  })
