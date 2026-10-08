import { createServerFn } from '@tanstack/react-start'
import { deleteCookie, getCookie, setCookie } from '@tanstack/react-start/server'

// ⚠️ FAKE AUTH, NOT SECURE. Demo only: there is no password, and the cookie just holds
// the name you typed, so anyone can "log in" as anyone. Real auth needs a session store
// or signed tokens (e.g. an auth library). This only exists to demo beforeLoad + redirect.
const USER_COOKIE = 'user'

export const getUser = createServerFn().handler(async () => getCookie(USER_COOKIE) ?? null)

export const login = createServerFn({ method: 'POST' })
  .validator((name: string) => {
    const trimmed = typeof name === 'string' ? name.trim() : ''
    if (trimmed.length < 1 || trimmed.length > 30) throw new Error('Name must be 1–30 characters')
    return trimmed
  })
  .handler(async ({ data: name }) => {
    setCookie(USER_COOKIE, name, { path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 })
  })

export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  deleteCookie(USER_COOKIE, { path: '/' })
})
