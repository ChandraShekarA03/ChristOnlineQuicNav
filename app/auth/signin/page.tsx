'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f0f2ff] dark:from-[#0f1129] dark:to-[#161833] flex items-center justify-center p-4 overflow-hidden">
      {/* Clean background */}
      <div className="fixed inset-0 -z-10">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#7C83FF 1px, transparent 1px), linear-gradient(90deg, #7C83FF 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary-400/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-300/10 dark:bg-primary-600/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-scale-in">
        <Card className="p-8 backdrop-card shadow-2xl border-primary-200/50 dark:border-primary-800/50">
          {/* Logo */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-xl shadow-primary-500/30 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text font-heading mb-2">Welcome Back</h1>
            <p className="text-secondary font-body">Sign in to Christ Faculty Hub</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2 font-body">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface border border-medium rounded-xl text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-body hover:border-primary-300"
                  placeholder="your.email@christuniversity.in"
                  required
                />
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2 font-body">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-surface border border-medium rounded-xl text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-body hover:border-primary-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="animate-shake text-danger text-sm text-center py-3 px-4 bg-danger/10 rounded-xl border border-danger/20 font-body">
                {error}
              </div>
            )}

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button
                type="submit"
                className="w-full py-3 text-base shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                disabled={loading}
                loading={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-primary-200/20 dark:border-primary-800/20 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-body transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-secondary text-sm mt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          &copy; 2026 Christ University. All rights reserved.
        </p>
      </div>
    </div>
  )
}