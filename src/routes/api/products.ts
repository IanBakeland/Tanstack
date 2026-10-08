import { createFileRoute } from '@tanstack/react-router'
import { products } from '../../server/products'

// [Start] A server route: no page, just an HTTP endpoint. GET /api/products returns JSON.
// Lives in src/routes like a page, but `server.handlers` makes it run only on the server.
export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async () => Response.json(products),
    },
  },
})
