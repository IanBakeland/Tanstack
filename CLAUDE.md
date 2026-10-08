# CLAUDE.md — TanStack Start Mini Shop

You are building a **small, polished school demo** of **TanStack Start**: a fake Monster Energy flavor shop.
It is NOT a real shop. Every feature exists to be **shown live in a 10-minute presentation** and compared with **React Router**, which the student already knows.

The guiding question for every decision:
> "What does TanStack Start give me that I would not get as easily from React + React Router?"

If a feature doesn't help answer that, don't build it.

---

## Hard rules

1. **Verify every API in the current official docs before using it.** TanStack Start is young and its APIs have changed between versions (e.g. `validator` → `inputValidator`, the old `createServerFileRoute` → `server.handlers` on a route). Never copy old tutorials or code from memory.
   - Start: https://tanstack.com/start/latest
   - Router: https://tanstack.com/router/latest
   - Check the installed version in `package.json` and match the docs to it.
2. **No invented APIs.** Unsure → look it up. Still unsure → ask.
3. **No new dependencies** unless they're needed. Allowed: TanStack Start/Router and what the official starter installs, plus **Zod** for search-param validation if the docs recommend it. No UI kits, state libraries, auth services, databases or ORMs.
4. **No `any`.** Fix the types. The type-safety demo depends on it.
5. **Keep TanStack features visible in the source.** Don't wrap `createServerFn`, `validateSearch`, `beforeLoad`, `loader` or `preload` in custom helpers that hide them. The student has to point at them on a slide.
6. **Clear client/server split.** Server-only code goes in `src/server/`. Keep it out of client bundles.
7. **Small, boring, readable.** Short components and no premature abstraction. Comment only where a TanStack concept needs explaining, and label it:
   `// [Start]`, `// [Router]`, `// [React]` — so the origin of each feature is obvious.
8. **No real commerce.** No payments, no real checkout, no "buy" wording that implies a real transaction. Include a visible "Demo project, not affiliated with Monster Energy" note.
9. **Use the official Monster product images** (student's decision: personal school demo, not a real shop). Download them once into `public/cans/` and serve them locally, with no hotlinking, so the demo also works offline. Real flavor names are OK. Keep the "not affiliated with Monster Energy" note visible.

---

## What must be demonstrable (acceptance criteria)

| # | Demo | Feature | Origin |
|---|---|---|---|
| 1 | View Source on `/` shows product HTML | SSR | Start |
| 2 | `/products?category=ultra&sort=price` filters/sorts. Filters update the URL, and the page reads only from the URL | Typed search params | Router |
| 3 | `/products?sort=banaan` is caught by validation (falls back to default, no crash, no silent "valid" behavior) | `validateSearch` | Router |
| 4 | `/products/$productId` loads one product. Unknown id shows a not-found page | Dynamic route + `loader` + `notFound` | Router |
| 5 | Hovering a product card starts loading (visible in Network tab) | `preload="intent"` | Router |
| 6 | "Add to cart" calls a server function and the navbar count updates | `createServerFn` | Start |
| 7 | `/checkout` logged out → redirect `/login?redirect=/checkout` → log in → back to checkout | `beforeLoad` + `redirect` + cookie | Router + Start |
| 8 | `/api/products` returns JSON | Server route | Start |
| 9 | Typo in `<Link to>` / `params` / `search` gives a real TS error | Generated route tree types | Router |
| 10 | Shared layout (navbar + cart count) on every page | `__root.tsx` | Router |

Also: `npm run build` succeeds, the deployed version works, the layout is responsive, there's no unused code, and the README is complete.

---

## Design decisions (already made — don't re-litigate)

- **Data:** `src/server/products.ts` holds a typed array of 10–15 products. No database.
- **Product type:**
  ```ts
  type Category = 'ultra' | 'juice' | 'original' | 'other'
  type Product = {
    id: string          // slug, e.g. "mango-loco"
    name: string
    flavor: string
    category: Category
    description: string
    price: number       // euros
    caffeineMg: number
    color: string       // accent color for the card/can
    image: string       // local path in /public
    featured: boolean
  }
  ```
- **Search params:** `category: 'all' | Category` (default `'all'`), `sort: 'featured' | 'price' | 'name'` (default `'featured'`). Invalid values fall back to the default. Use the approach the current docs recommend, such as a Zod schema with `.catch()` or a plain validator function.
- **Cart is stored in a cookie, NOT in a server memory array.** In-memory state disappears on serverless hosts (Netlify/Vercel), so the deployed demo would break. Server functions read and write the cookie using Start's server cookie helpers (verify the import path in the docs).
- **Fake auth:** the login form calls a server function that sets a `user` cookie with the entered name. `beforeLoad` on `/checkout` calls a server function that reads it. Add a comment in the code saying this is fake auth and not secure.
- **Logout** button in the navbar when logged in (one server function — needed to repeat the demo).
- **Styling:** plain CSS (one global stylesheet) or Tailwind if the official starter already includes it. Dark, energetic, bold type, product cards with a large can, subtle hover animations. Make it look good, but spend most of the time on functionality.

## Target structure (adjust only if current docs say otherwise)

```
src/
├─ router.tsx
├─ routeTree.gen.ts          (generated — never edit)
├─ routes/
│  ├─ __root.tsx             layout, navbar, <html> shell
│  ├─ index.tsx              home (SSR, featured products)
│  ├─ products/
│  │  ├─ index.tsx           grid + validateSearch
│  │  └─ $productId.tsx      loader + notFound
│  ├─ login.tsx
│  ├─ checkout.tsx           beforeLoad guard
│  └─ api/products.ts        server route → JSON
├─ server/
│  ├─ products.ts            data + getProducts/getProduct server fns
│  ├─ cart.ts                getCart/addToCart/removeFromCart server fns
│  └─ auth.ts                login/logout/getUser server fns (FAKE)
├─ components/
│  ├─ Navbar.tsx
│  ├─ ProductCard.tsx
│  └─ ProductGrid.tsx
└─ styles.css
public/cans/*          official product images (local copies)
```

---

## Workflow

1. **Before coding:** read the current docs for: project setup, `createServerFn`, `validateSearch`, `loader`, `preload`, `beforeLoad`/`redirect`, server routes, cookies, and deployment. Write a 5–10 line plan of what you verified (with versions) in `PLAN.md` under "Verified APIs".
2. Build in the phase order from `PLAN.md`. After each phase: `npm run dev`, check it in the browser, check the types, then tick the box in `PLAN.md`.
3. **Deploy early** (after phase 3) and redeploy after each major phase. Test the **production build** (`npm run build` + preview), not only dev.
4. **Never mark something done that you haven't tested.** If something doesn't work, say so.
5. Finish with `README.md` (project, tech, features with Start/Router labels, run, build, deploy, educational purpose, fake data/auth/no payments disclaimer).

## When to stop and ask the student

- The docs contradict this file.
- A feature needs a new dependency.
- A demo point (table above) can't be met as written.
