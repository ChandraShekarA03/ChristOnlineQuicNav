'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else {
        // Refresh session and redirect
        await getSession()
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary dark:from-secondary dark:via-secondary-dark dark:to-surface flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 glass-card">
        <div className="text-center mb-8">
          <h1 className="heading-primary font-heading mb-2">Sign In</h1>
          <p className="text-secondary font-body">Christ Faculty Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2 font-body">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-medium rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body"
              placeholder="your.email@christuniversity.in"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-2 font-body">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-medium rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-danger text-sm text-center font-body">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-primary hover:text-primary-dark text-sm font-body transition-colors">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  )
}