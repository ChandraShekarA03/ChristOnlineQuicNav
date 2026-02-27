import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, Database, Brain, BarChart3, Users, Link as LinkIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-christ-blue/20 to-christ-gold/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Christ Faculty Hub
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              This system is for Christ University Online Faculties to centrally manage important links and LLM modules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg" className="btn-primary">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="accent">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Core Requirements Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Core Requirements</h2>
          <p className="text-white/70 text-lg">Enterprise-grade features for academic excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <Shield className="w-12 h-12 text-christ-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Role-Based Authentication</h3>
              <p className="text-white/70">
                Secure access with Faculty, Admin, and Super Admin roles using NextAuth
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <Database className="w-12 h-12 text-christ-gold mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Protected Dashboard</h3>
              <p className="text-white/70">
                Middleware-protected routes ensuring secure access to all dashboard features
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <Brain className="w-12 h-12 text-christ-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Clean Modular Architecture</h3>
              <p className="text-white/70">
                Scalable folder structure with separation of concerns and maintainable code
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <Database className="w-12 h-12 text-christ-gold mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Prisma ORM</h3>
              <p className="text-white/70">
                Type-safe database operations with PostgreSQL for robust data management
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <Users className="w-12 h-12 text-christ-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">NextAuth Integration</h3>
              <p className="text-white/70">
                Secure authentication system with multiple providers and session management
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <BarChart3 className="w-12 h-12 text-christ-gold mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Zustand State Management</h3>
              <p className="text-white/70">
                Lightweight and efficient state management for complex application state
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <Brain className="w-12 h-12 text-christ-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Strategy Pattern</h3>
              <p className="text-white/70">
                LLM provider abstraction for flexible AI model integration and switching
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <BarChart3 className="w-12 h-12 text-christ-gold mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Token Usage Logging</h3>
              <p className="text-white/70">
                Comprehensive logging and analytics for LLM token consumption tracking
              </p>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <div className="p-6">
              <LinkIcon className="w-12 h-12 text-christ-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">API Route Handlers</h3>
              <p className="text-white/70">
                Robust backend logic with type-safe API endpoints for all operations
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Modules Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">System Modules</h2>
          <p className="text-white/70 text-lg">Comprehensive tools for faculty management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="p-6">
              <BarChart3 className="w-16 h-16 text-christ-gold mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Dashboard</h3>
              <p className="text-white/70 text-sm">Analytics, metrics, and usage statistics</p>
            </div>
          </Card>

          <Card className="text-center">
            <div className="p-6">
              <LinkIcon className="w-16 h-16 text-christ-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Link Management</h3>
              <p className="text-white/70 text-sm">CRUD operations with categories and search</p>
            </div>
          </Card>

          <Card className="text-center">
            <div className="p-6">
              <Brain className="w-16 h-16 text-christ-gold mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">LLM Modules</h3>
              <p className="text-white/70 text-sm">Prompt templates and model management</p>
            </div>
          </Card>

          <Card className="text-center">
            <div className="p-6">
              <Users className="w-16 h-16 text-christ-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">User Management</h3>
              <p className="text-white/70 text-sm">Admin-only user and role management</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/60">
            <p>&copy; 2026 Christ University Faculty Hub. Built with Next.js 14.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}