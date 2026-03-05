import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, Database, Brain, BarChart3, Users, Link as LinkIcon, Sparkles, ArrowRight, Zap, Globe } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Role-Based Authentication',
    description: 'Secure access with Faculty, Admin, and Super Admin roles using NextAuth',
    delay: 0,
  },
  {
    icon: Database,
    title: 'Protected Dashboard',
    description: 'Middleware-protected routes ensuring secure access to all dashboard features',
    delay: 100,
  },
  {
    icon: Brain,
    title: 'Clean Modular Architecture',
    description: 'Scalable folder structure with separation of concerns and maintainable code',
    delay: 200,
  },
  {
    icon: Database,
    title: 'Prisma ORM',
    description: 'Type-safe database operations with PostgreSQL for robust data management',
    delay: 300,
  },
  {
    icon: Users,
    title: 'NextAuth Integration',
    description: 'Secure authentication system with multiple providers and session management',
    delay: 400,
  },
  {
    icon: BarChart3,
    title: 'Zustand State Management',
    description: 'Lightweight and efficient state management for complex application state',
    delay: 500,
  },
]

const modules = [
  { icon: BarChart3, title: 'Dashboard', description: 'Analytics, metrics, and usage statistics', color: 'from-primary-500 to-primary-600' },
  { icon: LinkIcon, title: 'Link Management', description: 'CRUD operations with categories and search', color: 'from-blue-500 to-blue-600' },
  { icon: Brain, title: 'LMS Modules', description: 'Prompt templates and model management', color: 'from-purple-500 to-purple-600' },
  { icon: Users, title: 'User Management', description: 'Admin-only user and role management', color: 'from-green-500 to-green-600' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0f1129] overflow-hidden relative">
      {/* Clean gradient background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-primary-100/40 dark:from-[#0f1129] dark:via-[#1a1e3a] dark:to-[#1F2140]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#7C83FF 1px, transparent 1px), linear-gradient(90deg, #7C83FF 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Gradient orbs - more subtle and positioned better */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-300/5 to-transparent rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Hero gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/30 backdrop-blur-sm border border-primary-200 dark:border-primary-800 mb-8 animate-fade-in-down">
              <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Christ University Online Faculty Portal</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 animate-fade-in-up">
              <span className="gradient-text">Christ Faculty Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto font-body animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Centrally manage important links and LMS modules with a modern, intuitive interface designed for academic excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/auth/signin">
                <Button size="lg" className="group px-8 shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-300">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="px-8 backdrop-blur-sm">
                  <Globe className="w-5 h-5 mr-2" />
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {[
                { value: '500+', label: 'Faculty Members' },
                { value: '1000+', label: 'Links Managed' },
                { value: '50+', label: 'LMS Modules' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                  <div className="text-sm text-secondary mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Core Requirements Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Enterprise Features
          </div>
          <h2 className="text-4xl font-bold font-heading mb-4 gradient-text">Core Requirements</h2>
          <p className="text-secondary text-lg font-body max-w-2xl mx-auto">Enterprise-grade features for academic excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group relative overflow-hidden backdrop-blur-sm"
              hover="all"
              style={{ 
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${feature.delay}ms forwards`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/10 transition-all duration-500" />
              <div className="relative p-6">
                <div className="icon-container w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2 font-heading group-hover:gradient-text transition-all duration-300">{feature.title}</h3>
                <p className="text-secondary font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modules Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            Platform Modules
          </div>
          <h2 className="text-4xl font-bold font-heading mb-4 gradient-text">System Modules</h2>
          <p className="text-secondary text-lg font-body">Comprehensive tools for faculty management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <Card 
              key={module.title}
              className="group text-center relative overflow-hidden cursor-pointer"
              hover="all"
              style={{ 
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/10 transition-all duration-500" />
              <div className="relative p-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}>
                  <module.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2 font-heading">{module.title}</h3>
                <p className="text-secondary text-sm font-body">{module.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 border-0">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of faculty members already using Christ Faculty Hub for seamless LMS management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg" className="bg-white text-white hover:bg-white/90 shadow-xl px-8">
                  Sign In Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-primary-200/20 dark:border-primary-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text font-heading">Christ Faculty Hub</span>
              </div>
              <p className="text-secondary text-sm max-w-sm">
                Empowering Christ University Online Faculties with modern tools for link and LMS management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li><Link href="/dashboard" className="hover:text-primary-600 transition-colors animated-underline">Dashboard</Link></li>
                <li><Link href="/dashboard/links" className="hover:text-primary-600 transition-colors animated-underline">Links</Link></li>
                <li><Link href="/dashboard/lms" className="hover:text-primary-600 transition-colors animated-underline">LMS Modules</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li><Link href="#" className="hover:text-primary-600 transition-colors animated-underline">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors animated-underline">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors animated-underline">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-primary-200/20 dark:border-primary-800/20 text-center text-secondary text-sm">
            <p>&copy; 2026 Christ University Faculty Hub. Built with Next.js 14.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}