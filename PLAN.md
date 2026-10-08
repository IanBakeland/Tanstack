# PLAN.md — TanStack Start Mini Shop

Your roadmap. It tracks what gets built, in what order, why each step matters for your presentation, and what **you** need to do. The agent follows `CLAUDE.md`. This file is for you.

---

## The big picture

**What:** a fake Monster Energy flavor shop, built with TanStack Start.
**Why:** each page shows one TanStack feature you can demo live and compare with React Router.
**Deliverables:** (1) presentation PDF, (2) ZIP of the source code.

### The one thing to remember for your presentation

```
TanStack Start   = the SERVER part   → SSR, server functions, server routes, cookies
TanStack Router  = the ROUTING part  → file routes, loaders, search params, preload, beforeLoad, types
React            = the UI            → components, state
```

Start is built **on top of** Router. Most of the "wow, this is type-safe" moments come from Router. Start adds the server.

---

## Feature → demo → React Router comparison

| Feature | Where in the app | How you demo it | In React Router you'd... |
|---|---|---|---|
| SSR | `/` | View Source → HTML is already there | Need framework mode (SSR also exists there) |
| File-based routing | `src/routes/` | Show the folder = the URL structure | Framework mode has file routes, or you use `routes.ts` config |
| Dynamic route + loader | `/products/$productId` | Open a product, show the `loader` | Similar: `loader` + `useLoaderData` |
| Typed search params | `/products?category=ultra&sort=price` | Click filters, watch the URL | `useSearchParams` gives **strings** → parse/validate yourself |
| Search validation | `/products?sort=banaan` | Type it by hand → falls back to default | Write that check yourself |
| Preloading | Product cards | Network tab + hover | `<Link prefetch="intent">` exists. TanStack also caches loader data |
| Server function | "Add to cart" | Click, count updates, show `createServerFn` | `action` + `<Form>`, tied to a route. No callable function |
| Protected route | `/checkout` | Logged out → redirect → login → back | Check in `loader` + `redirect` (works, but no typed context) |
| Server route | `/api/products` | Open it → JSON | Resource route (similar) |
| Type safety | Editor | Break a `<Link>` → red line | `+types` typegen covers params/loader, **not** search params or `<Link to>` |
| Shared layout | `__root.tsx` | Navbar on every page | Root layout + `<Outlet />` (same idea) |

> ⚠️ Verify the React Router column yourself in https://reactrouter.com before you put it on a slide. React Router v7 *framework mode* (formerly Remix) is the fair comparison, not the client-only mode from class. Saying that out loud during the presentation shows you did real research.

---

## Build phases

Tick the boxes as you go. The ✋ items are things **you** do, not the agent.

### Phase 0 — Setup
- [x] Create the project with the official starter (check the current command at https://tanstack.com/start/latest)
- [x] Note the installed TanStack Start version → write it under "Verified APIs" below
- [x] Agent reads the docs and fills in "Verified APIs"
- [ ] ✋ Read the "Verified APIs" list. You'll need these exact names in your slides.

### Phase 1 — Foundation
- [x] `__root.tsx` with the HTML shell + navbar (empty cart count for now)
- [x] Empty routes: `/`, `/products`, `/products/$productId`, `/login`, `/checkout`
- [x] Global stylesheet with colors and fonts

### Phase 2 — Data
- [x] `Product` type + 10–15 products in `src/server/products.ts`
- [x] Official Monster can images in `public/cans/` (14 × WebP, from monsterenergy.com/nl-nl)
- [x] `ProductCard` + `ProductGrid`

### Phase 3 — Product routes ✅ demo 1, 4
- [x] Home: hero + featured products (SSR)
- [x] `/products/$productId` with `loader` + not-found page
- [ ] ✋ View Source on `/` and check that the product names are in the HTML
- [ ] **Deploy for the first time** (Vercel) and check that it works online

### Phase 4 — Search params ✅ demo 2, 3
- [ ] `validateSearch` with `category` + `sort` and defaults
- [ ] Filter/sort buttons that only change the URL
- [ ] ✋ Try `?sort=banaan` and `?category=lol` and make sure the page doesn't break

### Phase 5 — Preloading ✅ demo 5
- [ ] `preload="intent"` on product links
- [ ] ✋ DevTools → Network → hover → see the request appear before you click

### Phase 6 — Cart ✅ demo 6
- [ ] `addToCart` / `removeFromCart` / `getCart` server functions (cart stored in a **cookie**)
- [ ] Add-to-cart button + navbar count updates
- [ ] Cart contents shown on `/checkout`

> Why a cookie and not an array on the server? On Vercel/Netlify the server restarts all the time, so an array would lose the cart. This is a good "what I learned" point.

### Phase 7 — Fake auth ✅ demo 7
- [ ] `/login` form → server function sets a `user` cookie
- [ ] `/checkout` `beforeLoad` → not logged in → `redirect` to `/login?redirect=/checkout`
- [ ] After login, go back to the redirect target
- [ ] Logout button (so you can repeat the demo)

### Phase 8 — API route ✅ demo 8
- [ ] `/api/products` returns JSON

### Phase 9 — Type safety ✅ demo 9
- [ ] ✋ Test it yourself: change `to="/products/$productId"` to `to="/product/$productId"` → error?
- [ ] ✋ Remove `params` → error? Pass `search={{ sort: 'banaan' }}` → error?
- [ ] Revert all of it

### Phase 10 — Polish
- [ ] Responsive (phone width), hover animations, loading/error states
- [ ] "Demo project, not affiliated with Monster Energy" in the footer

### Phase 11 — Test everything
- [ ] Walk through all 7 demos below on the **deployed** site
- [ ] `npm run build` without errors

### Phase 12 — Wrap-up
- [ ] README complete
- [ ] Final deploy
- [ ] ✋ ZIP the source (**without** `node_modules`, `.output`, `dist`)

---

## Live demo script (~4 min of your 10)

1. **SSR**: open `/` → View Source → "the HTML comes from the server."
2. **Search params**: `/products` → click Ultra → sort by price → URL changes → type `?sort=banaan` → validation.
3. **Preload**: Network tab → hover a can → request fires → click → instant.
4. **Server function**: Add to cart → count goes up → switch to the editor → show `createServerFn`.
5. **Protected route**: `/checkout` → redirected to login → log in → back on checkout.
6. **API**: `/api/products` → JSON.
7. **Types**: break a `<Link>` in the editor → red line → undo.

✋ Practice this at least 3 times. Have a backup video recording in case the Wi-Fi fails.

---

## Your next steps (in order)

1. ✋ Decide where this project lives on your computer (the agent can move it there).
2. ✋ Give the agent the go-ahead to do **Phase 0** (setup + verify APIs).
3. Then build phase by phase. Check every ✋ item yourself, because you have to be able to explain it.
4. **In parallel**, start your research log (see below). You need it for the "how did I research" slide.
5. When Phase 11 is done, start the slides. (Ask for the presentation structure then.)

### Research log (keep it while you build)
Keep a short `research-log.md` with: date, what you read (link), what you tried, what surprised you or went wrong.
Sources, in order of priority:
1. https://tanstack.com/start/latest (official docs)
2. https://tanstack.com/router/latest
3. https://reactrouter.com (for the comparison)
4. https://github.com/TanStack/router (examples, issues, changelog)
5. Talks/videos by the maintainers (Tanner Linsley) as supporting material only

---

## Verified APIs

Verified 2026-10-08 against the docs **and** the installed type definitions in `node_modules`.

**Setup:** `npx @tanstack/cli@latest create monster-shop --framework React --package-manager npm --no-examples --deployment netlify --no-toolchain --no-git --non-interactive`
Installed: `@tanstack/react-start` **1.168.60**, `@tanstack/react-router` **1.170.41**, React 19.2, Vite 8, TypeScript 6, Tailwind 4 (comes with the starter).

| Concept | API / import | Verified in docs (link) |
|---|---|---|
| TanStack Start version | `@tanstack/react-start@1.168.60` (Router `1.170.41`) | `package.json` / `npm ls` |
| Server function | `createServerFn({ method: 'POST' }).handler(...)` from `'@tanstack/react-start'` (GET is the default). Call it directly in `loader`/`beforeLoad`, or use `useServerFn(fn)` in components | [server-functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions) |
| Input validation for server fn | **`.validator(fnOrSchema)`**. ⚠️ `.inputValidator` still exists but is marked `@deprecated` in 1.168 (see the `createServerFn.d.ts` types) | same page + installed types |
| Search param validation | `validateSearch` on the route: a plain function `(search: Record<string, unknown>) => T`, or a Zod v4 schema passed directly (Standard Schema, no adapter) with `.catch()` for fallbacks. Read with `Route.useSearch()`, write with `<Link search={(prev) => ...}>` / `useNavigate` | [search-params](https://tanstack.com/router/latest/docs/framework/react/guide/search-params) |
| Loader / notFound | `loader: ({ params }) => ...`. `throw notFound()` (from `'@tanstack/react-router'`). Render it with the `notFoundComponent` route option or the router's `defaultNotFoundComponent` | [not-found-errors](https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors) |
| Preloading | `<Link preload="intent">` or router `defaultPreload: 'intent'` (the starter already sets this in `src/router.tsx`). Default delay is 50ms. `defaultPreloadStaleTime` sets how long preloaded data stays fresh (default 30s; the starter sets it to 0) | [preloading](https://tanstack.com/router/latest/docs/framework/react/guide/preloading) |
| beforeLoad / redirect | `beforeLoad: async ({ location }) => { throw redirect({ to: '/login', search: { redirect: location.href } }) }`. `redirect` comes from `'@tanstack/react-router'` | [authenticated-routes](https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes) |
| Server route | `createFileRoute('/api/products')({ server: { handlers: { GET: async () => Response.json(data) } } })` in `src/routes/` | [server-routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes) |
| Cookies (server) | `getCookie`, `setCookie(name, value, opts)`, `deleteCookie` from `'@tanstack/react-start/server'`. Server-only: call them inside server functions | [hydration-errors](https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors) (uses them) + installed types |
| Deployment adapter | **Vercel via Nitro**: `nitro` package (pinned `3.0.260610-beta`, the version the TanStack CLI picks), `nitro()` from `'nitro/vite'` in `vite.config.ts`, plus `vercel.json` with `"framework": "tanstack-start"`. On Vercel, Nitro produces `.vercel/output` automatically. Locally, `npm run build` + `npm run preview` → http://localhost:3000 | [hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) (Vercel → "follow the Nitro instructions") |

**Setup notes**
- The project was first created with the Netlify adapter. It was swapped for Vercel/Nitro at the student's request: GitHub Pages is static-only and can't run server functions, cookies or server routes (demos 6–8). The Netlify dev emulator had also crashed `npm run dev` with local Deno 2.9.7 (`--allow-scripts` flag rejected).
- Checked: `npm run dev` → `/` is server-rendered (heading is in the raw HTML). `npm run build` passes, `VERCEL=1 npm run build` produces `.vercel/output`, and `npm run preview` (port 3000) serves the server-rendered page. `tsc --noEmit` is clean.
