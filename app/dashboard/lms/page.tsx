'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Plus, 
  Search, 
  Settings, 
  Play, 
  Clock, 
  Zap, 
  Sparkles, 
  Cpu, 
  MessageSquare,
  TrendingUp,
  BookOpen,
  Code,
  Lightbulb,
  ChevronRight
} from 'lucide-react'

const modules = [
  {
    id: 1,
    name: 'Course Content Generator',
    description: 'AI-powered tool to generate comprehensive course materials and lecture notes',
    model: 'GPT-4',
    prompts: 156,
    tokens: 45200,
    status: 'active',
    category: 'Content',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    name: 'Quiz Builder',
    description: 'Automatically create quizzes and assessments from course content',
    model: 'GPT-3.5-Turbo',
    prompts: 89,
    tokens: 23400,
    status: 'active',
    category: 'Assessment',
    icon: Code,
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 3,
    name: 'Student Feedback Analyzer',
    description: 'Analyze and summarize student feedback for continuous improvement',
    model: 'GPT-4',
    prompts: 234,
    tokens: 67800,
    status: 'active',
    category: 'Analytics',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    name: 'Research Assistant',
    description: 'Get help with research papers, citations, and literature reviews',
    model: 'GPT-4-Turbo',
    prompts: 67,
    tokens: 89500,
    status: 'beta',
    category: 'Research',
    icon: Lightbulb,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    name: 'Assignment Grader',
    description: 'AI-assisted grading for assignments with detailed feedback',
    model: 'GPT-4',
    prompts: 312,
    tokens: 125000,
    status: 'active',
    category: 'Assessment',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 6,
    name: 'Discussion Facilitator',
    description: 'Generate discussion prompts and facilitate online conversations',
    model: 'GPT-3.5-Turbo',
    prompts: 145,
    tokens: 34200,
    status: 'active',
    category: 'Engagement',
    icon: MessageSquare,
    color: 'from-indigo-500 to-blue-500'
  },
]

const categories = ['All', 'Content', 'Assessment', 'Analytics', 'Research', 'Engagement']

export default function LMSModulesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = [
    { label: 'Total Modules', value: '6', icon: Brain, change: '+2 new', color: 'text-violet-600' },
    { label: 'Total Prompts', value: '1,003', icon: MessageSquare, change: '+12% this week', color: 'text-blue-600' },
    { label: 'Tokens Used', value: '385K', icon: Zap, change: '+28% this month', color: 'text-orange-600' },
    { label: 'Active Sessions', value: '24', icon: Cpu, change: 'Currently active', color: 'text-green-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text font-heading">LMS Modules</h1>
          <p className="text-secondary font-body mt-1">
            AI-powered learning management tools
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30">
            <Plus className="w-4 h-4 mr-2" />
            Create Module
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-violet-200/20 dark:border-violet-800/20 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold gradient-text">{stat.value}</h3>
                    <p className="text-xs text-success mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-100/50 dark:bg-violet-900/20">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-white/50 dark:bg-slate-800/50 text-secondary hover:bg-violet-100/50 dark:hover:bg-violet-900/20 border border-violet-200/20 dark:border-violet-800/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="group h-full border-violet-200/20 dark:border-violet-800/20 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color} shadow-lg`}>
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant={module.status === 'active' ? 'success' : 'warning'}
                    className="text-xs"
                  >
                    {module.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold font-heading text-primary group-hover:text-violet-600 transition-colors">
                  {module.name}
                </CardTitle>
                <CardDescription className="text-sm font-body line-clamp-2">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs text-secondary">
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{module.model}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{module.prompts}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{(module.tokens / 1000).toFixed(1)}K</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-violet-100 dark:border-violet-800">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-md">
                    <Play className="w-3.5 h-3.5 mr-1.5" />
                    Launch
                  </Button>
                  <Button size="sm" variant="outline" className="border-violet-200 dark:border-violet-800 hover:bg-violet-100/50 dark:hover:bg-violet-900/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-violet-200/20 dark:border-violet-800/20 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/30">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary">Need a Custom Module?</h3>
                  <p className="text-secondary font-body mt-1">
                    Create a custom AI module tailored to your specific needs
                  </p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-violet-300 dark:border-violet-700 hover:bg-violet-100/50 dark:hover:bg-violet-900/20">
                  Create Custom Module
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
