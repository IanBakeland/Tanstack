import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export type Category = 'ultra' | 'juice' | 'original' | 'other'

export type Product = {
  id: string // slug, e.g. "mango-loco"
  name: string
  flavor: string
  category: Category
  description: string
  price: number // euros
  caffeineMg: number
  color: string // accent color for the card/can
  image: string // local path in /public
  featured: boolean
}

// Demo data. Names, caffeine (per 500 ml can) and images come from monsterenergy.com/nl-nl;
// prices and descriptions are made up. This array only lives on the server.
export const products: Product[] = [
  {
    id: 'monster-original',
    name: 'The Original Green',
    flavor: 'Classic energy',
    category: 'original',
    description: 'The one that started it all: sweet, tangy and unmistakably green.',
    price: 2.19,
    caffeineMg: 160,
    color: '#7cff00',
    image: '/cans/monster-original.webp',
    featured: true,
  },
  {
    id: 'zero-sugar',
    name: 'Zero Sugar',
    flavor: 'Classic, no sugar',
    category: 'original',
    description: 'The original taste with zero sugar and the same full kick.',
    price: 2.19,
    caffeineMg: 160,
    color: '#a6ff4d',
    image: '/cans/zero-sugar.webp',
    featured: false,
  },
  {
    id: 'full-throttle',
    name: 'Full Throttle',
    flavor: 'Citrus',
    category: 'original',
    description: 'A sharp citrus hit for when the day needs a little more speed.',
    price: 2.29,
    caffeineMg: 160,
    color: '#ff7a1a',
    image: '/cans/full-throttle.webp',
    featured: false,
  },
  {
    id: 'ultra-white',
    name: 'Ultra White',
    flavor: 'Light citrus',
    category: 'ultra',
    description: 'Crisp, light and zero sugar. The legendary white can.',
    price: 2.29,
    caffeineMg: 150,
    color: '#dfe7ea',
    image: '/cans/ultra-white.webp',
    featured: true,
  },
  {
    id: 'ultra-fiesta',
    name: 'Ultra Fiesta',
    flavor: 'Mango',
    category: 'ultra',
    description: 'Juicy mango without the sugar. Bring your own party.',
    price: 2.29,
    caffeineMg: 150,
    color: '#3fc6c6',
    image: '/cans/ultra-fiesta.webp',
    featured: false,
  },
  {
    id: 'ultra-rosa',
    name: 'Ultra Rosa',
    flavor: 'Raspberry rose',
    category: 'ultra',
    description: 'Soft berry notes with a floral twist, zero sugar.',
    price: 2.39,
    caffeineMg: 150,
    color: '#ff8fc7',
    image: '/cans/ultra-rosa.webp',
    featured: false,
  },
  {
    id: 'ultra-strawberry-dreams',
    name: 'Ultra Strawberry Dreams',
    flavor: 'Strawberry',
    category: 'ultra',
    description: 'Strawberry with a dreamy, creamy finish and zero sugar.',
    price: 2.39,
    caffeineMg: 150,
    color: '#ff5c8a',
    image: '/cans/ultra-strawberry-dreams.webp',
    featured: false,
  },
  {
    id: 'ultra-peachy-keen',
    name: 'Ultra Peachy Keen',
    flavor: 'Peach',
    category: 'ultra',
    description: 'Ripe peach, light and bubbly, without the sugar.',
    price: 2.39,
    caffeineMg: 150,
    color: '#ffa07a',
    image: '/cans/ultra-peachy-keen.webp',
    featured: false,
  },
  {
    id: 'mango-loco',
    name: 'Mango Loco',
    flavor: 'Mango',
    category: 'juice',
    description: 'A loud tropical blend of mango and juice. Fan favorite.',
    price: 2.49,
    caffeineMg: 160,
    color: '#35d0e6',
    image: '/cans/mango-loco.webp',
    featured: true,
  },
  {
    id: 'pacific-punch',
    name: 'Pacific Punch',
    flavor: 'Fruit punch',
    category: 'juice',
    description: 'A big fruit punch with a citrus edge.',
    price: 2.49,
    caffeineMg: 160,
    color: '#ff8a3d',
    image: '/cans/pacific-punch.webp',
    featured: false,
  },
  {
    id: 'pipeline-punch',
    name: 'Pipeline Punch',
    flavor: 'Passion fruit, orange, guava',
    category: 'juice',
    description: 'Passion fruit, orange and guava. Tastes like a surf trip.',
    price: 2.49,
    caffeineMg: 160,
    color: '#ff6fa8',
    image: '/cans/pipeline-punch.webp',
    featured: true,
  },
  {
    id: 'bad-apple',
    name: 'Bad Apple',
    flavor: 'Green apple',
    category: 'juice',
    description: 'Tart green apple with a mischievous bite.',
    price: 2.49,
    caffeineMg: 160,
    color: '#e0303f',
    image: '/cans/bad-apple.webp',
    featured: false,
  },
  {
    id: 'rehab-peach',
    name: 'Rehab Tea + Peach',
    flavor: 'Iced tea, peach',
    category: 'other',
    description: 'Iced tea with peach, low in sugar and not carbonated.',
    price: 2.59,
    caffeineMg: 160,
    color: '#f6a46b',
    image: '/cans/rehab-peach.webp',
    featured: false,
  },
  {
    id: 'rehab-lemonade',
    name: 'Rehab Tea + Lemonade',
    flavor: 'Iced tea, lemon',
    category: 'other',
    description: 'Iced tea meets lemonade, low in sugar and not carbonated.',
    price: 2.59,
    caffeineMg: 160,
    color: '#f4e04d',
    image: '/cans/rehab-lemonade.webp',
    featured: false,
  },
]

// [Start] A server function: this runs only on the server. Calling it from the
// client becomes a fetch request automatically. No API route needed.
export const getProducts = createServerFn().handler(async () => products)

export const getProduct = createServerFn()
  // [Start] .validator checks the input at runtime (it comes over the network)
  // and types `data` in the handler below.
  .validator((id: string) => {
    if (typeof id !== 'string') throw new Error('productId must be a string')
    return id
  })
  .handler(async ({ data: id }) => {
    const product = products.find((p) => p.id === id)
    // [Router] notFound() thrown here reaches the route's notFoundComponent.
    if (!product) throw notFound()
    return product
  })
