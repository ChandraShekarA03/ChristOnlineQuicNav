'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Database, 
  Brain, 
  BarChart3, 
  Users, 
  Link as LinkIcon, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Globe,
  Rocket,
  CheckCircle2,
  Star,
  TrendingUp,
  Lock,
  Layers,
  Palette,
  ChevronRight
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Firebase Authentication',
    description: 'Secure access with Google, Email, and role-based permissions using Firebase Auth',
    color: 'from-blue-500 to-cyan-500',
    delay: 0,
  },
  {
    icon: Database,
    title: 'Firestore Database',
    description: 'Real-time NoSQL database with automatic scaling and offline support',
    color: 'from-purple-500 to-pink-500',
    delay: 100,
  },
  {
    icon: Brain,
    title: 'AI-Powered LMS',
    description: 'Smart learning management with AI integration and automated workflows',
    color: 'from-orange-500 to-red-500',
    delay: 200,
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights with beautiful charts and comprehensive metrics',
    color: 'from-green-500 to-emerald-500',
    delay: 300,
  },
  {
    icon: Users,
    title: 'User Management',
    description: 'Complete user administration with roles, departments, and permissions',
    color: 'from-indigo-500 to-purple-500',
    delay: 400,
  },
  {
    icon: LinkIcon,
    title: 'Link Management',
    description: 'Organize and share important resources with categories and search',
    color: 'from-pink-500 to-rose-500',
    delay: 500,
  },
]

const modules = [
  { icon: BarChart3, title: 'Dashboard', description: 'Analytics & metrics', color: 'from-violet-500 to-purple-600' },
  { icon: LinkIcon, title: 'Links', description: 'Resource management', color: 'from-blue-500 to-cyan-600' },
  { icon: Brain, title: 'LMS', description: 'AI modules', color: 'from-orange-500 to-red-600' },
  { icon: Users, title: 'Users', description: 'Team management', color: 'from-green-500 to-emerald-600' },
]

const stats = [
  { value: '500+', label: 'Active Users', icon: Users },
  { value: '1000+', label: 'Resources', icon: LinkIcon },
  { value: '50+', label: 'LMS Modules', icon: Brain },
  { value: '99.9%', label: 'Uptime', icon: Zap },
]

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Professor',
    content: 'This platform has transformed how we manage our faculty resources. The AI integration is incredible!',
    avatar: 'SJ',
  },
  {
    name: 'Prof. Michael Chen',
    role: 'Department Head',
    content: 'The best faculty management system I\'ve used. Intuitive, fast, and beautifully designed.',
    avatar: 'MC',
  },
  {
    name: 'Dr. Anna Martinez',
    role: 'Admin',
    content: 'Managing users and resources has never been easier. The analytics are game-changing.',
    avatar: 'AM',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaff] dark:bg-[#020617] overflow-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/30 to-indigo-100/40 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b]" />

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />

        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-400/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/15 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-300/8 to-transparent rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 glass-nav border-b border-violet-200/20 dark:border-violet-800/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text font-heading">Christ Faculty Hub</span>
            </motion.div>

            <div className="flex items-center gap-3">
              <Link href="/auth/signin">
                <Button className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40">
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 dark:bg-violet-900/30 backdrop-blur-sm border border-violet-200 dark:border-violet-800 mb-8"
            >
              <Sparkles className="w-4 h-4 text-violet-600 animate-pulse" />
              <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Christ University Online Faculty Portal</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6"
            >
              <span className="gradient-text">Manage Everything</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                In One Place
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-secondary mb-10 max-w-3xl mx-auto font-body"
            >
              Centrally manage important links and LMS modules with a modern, 
              intuitive interface designed for academic excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/auth/signup">
                <Button size="lg" className="group px-10 shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700">
                  <span>Start Free Trial</span>
                  <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="px-10 backdrop-blur-sm border-2 hover:border-violet-300 dark:hover:border-violet-700">
                  <Globe className="w-5 h-5 mr-2" />
                  View Demo
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 mb-3 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-secondary mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 gradient-text">
            Everything You Need
          </h2>
          <p className="text-secondary text-lg font-body max-w-2xl mx-auto">
            Enterprise-grade features for academic excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay / 1000 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="group relative overflow-hidden backdrop-blur-sm h-full border-violet-200/50 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-2xl hover:shadow-violet-500/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-all duration-500`} />
                <div className="relative p-7">
                  <div className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2.5 font-heading group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-secondary font-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modules Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            Platform Modules
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 gradient-text">
            System Modules
          </h2>
          <p className="text-secondary text-lg font-body">
            Comprehensive tools for faculty management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <Card className="group text-center relative overflow-hidden cursor-pointer border-violet-200/50 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-2xl hover:shadow-violet-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/5 group-hover:from-violet-500/10 group-hover:to-violet-500/15 transition-all duration-500" />
                <div className="relative p-8">
                  <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2 font-heading">{module.title}</h3>
                  <p className="text-secondary text-sm font-body">{module.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 gradient-text">
            Loved by Faculty
          </h2>
          <p className="text-secondary text-lg font-body">
            See what our users have to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-violet-200/50 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-xl hover:shadow-violet-500/10">
                <div className="p-7">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-secondary font-body leading-relaxed mb-6">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-primary font-heading">{testimonial.name}</p>
                      <p className="text-sm text-secondary">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 border-0">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="relative p-12 md:p-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-white font-heading mb-4"
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
              >
                Join hundreds of faculty members already using Christ Faculty Hub 
                for seamless LMS management.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/auth/signin">
                  <Button size="lg" className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-xl shadow-violet-500/30 px-10">
                    Sign In Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10">
                    Explore Features
                  </Button>
                </Link>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-violet-200/20 dark:border-violet-800/20 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text font-heading">Christ Faculty Hub</span>
              </div>
              <p className="text-secondary text-sm max-w-sm leading-relaxed">
                Empowering Christ University Online Faculties with modern tools 
                for link and LMS management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4 font-heading">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-secondary">
                <li><Link href="/dashboard" className="hover:text-violet-600 transition-colors">Dashboard</Link></li>
                <li><Link href="/dashboard/links" className="hover:text-violet-600 transition-colors">Links</Link></li>
                <li><Link href="/dashboard/lms" className="hover:text-violet-600 transition-colors">LMS Modules</Link></li>
                <li><Link href="/dashboard/users" className="hover:text-violet-600 transition-colors">Users</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4 font-heading">Support</h4>
              <ul className="space-y-2.5 text-sm text-secondary">
                <li><Link href="#" className="hover:text-violet-600 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-violet-600 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-violet-600 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-violet-600 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <motion.div 
            className="pt-8 border-t border-violet-200/20 dark:border-violet-800/20 text-center text-secondary text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p>&copy; 2026 Christ University Faculty Hub. Built with Next.js 14 & Firebase.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
