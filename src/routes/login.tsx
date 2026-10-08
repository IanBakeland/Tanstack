import { useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { login } from '../server/auth'

export const Route = createFileRoute('/login')({
  // [Router] ?redirect=/checkout tells us where to go after logging in.
  // Only same-site paths are accepted, so the link can't send you to another website.
  // Always return the key: keys left out keep their raw, unchecked URL value.
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const r = search.redirect
    return { redirect: typeof r === 'string' && r.startsWith('/') && !r.startsWith('//') ? r : undefined }
  },
  component: Login,
})

function Login() {
  const { redirect } = Route.useSearch()
  const router = useRouter()
  const loginFn = useServerFn(login)
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(null)
    try {
      await loginFn({ data: name })
      // Reload loaders (navbar shows the name), then go back to where the guard sent us from
      await router.invalidate()
      router.history.push(redirect ?? '/')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed')
      setPending(false)
    }
  }

  return (
    <section className="mx-auto max-w-sm py-6">
      <h1 className="font-display text-5xl uppercase">Log in</h1>
      <p className="mt-2 text-sm text-white/60">
        Fake login: type any name, no password. Nothing is stored except a cookie with your name.
      </p>
      {redirect && (
        <p className="mt-4 rounded-lg border border-neon/40 bg-neon/10 px-3 py-2 text-sm">
          Log in to continue to <code className="text-neon">{redirect}</code>
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <label htmlFor="name" className="text-xs font-bold uppercase text-white/60">
          Your name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={30}
          autoFocus
          className="rounded-lg border border-white/20 bg-panel px-4 py-3 outline-none focus:border-neon"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-neon px-6 py-3 font-bold text-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </section>
  )
}
