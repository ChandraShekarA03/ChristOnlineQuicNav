'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toast'
import { Plus, Play, Settings, BarChart3, Brain, Sparkles, Loader2, Trash2, Edit, Copy, CheckCircle, AlertCircle } from 'lucide-react'

interface LMSModule {
  id: string
  name: string
  description: string
  promptTemplate: string
  model: string
  createdAt: string
  updatedAt: string
}

const AI_MODELS = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
]

export default function LMSPage() {
  const [modules, setModules] = useState<LMSModule[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedModule, setSelectedModule] = useState<LMSModule | null>(null)
  const [userInput, setUserInput] = useState('')
  const [response, setResponse] = useState('')
  const [executing, setExecuting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingModule, setEditingModule] = useState<LMSModule | null>(null)
  
  const { success, error, info } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    promptTemplate: '',
    model: 'gpt-3.5-turbo'
  })

  const fetchModules = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/lms')
      if (response.ok) {
        const data = await response.json()
        setModules(data)
      } else {
        error('Failed to fetch modules')
      }
    } catch (err) {
      error('An error occurred while fetching modules')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchModules()
  }, [])

  const handleOpenForm = (module?: LMSModule) => {
    if (module) {
      setEditingModule(module)
      setFormData({
        name: module.name,
        description: module.description,
        promptTemplate: module.promptTemplate,
        model: module.model
      })
    } else {
      setEditingModule(null)
      setFormData({
        name: '',
        description: '',
        promptTemplate: '',
        model: 'gpt-3.5-turbo'
      })
    }
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = editingModule ? `/api/lms/${editingModule.id}` : '/api/lms'
      const method = editingModule ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        success(
          editingModule ? 'Module updated successfully!' : 'Module created successfully!',
          editingModule ? 'The LMS module has been updated' : 'The new LMS module has been added'
        )
        setShowForm(false)
        fetchModules()
        setFormData({ name: '', description: '', promptTemplate: '', model: 'gpt-3.5-turbo' })
      } else {
        const data = await response.json()
        error(data.error || 'Failed to save module')
      }
    } catch (err) {
      error('An error occurred while saving the module')
    } finally {
      setIsSubmitting(false)
    }
  }

  const executeModule = async () => {
    if (!selectedModule || !userInput) return

    setExecuting(true)
    setResponse('')

    try {
      const res = await fetch('/api/lms/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: selectedModule.id,
          userInput
        })
      })

      if (res.ok) {
        const data = await res.json()
        setResponse(data.response)
        success('Module executed successfully!', 'Response generated')
      } else {
        setResponse('Error executing module')
        error('Failed to execute module')
      }
    } catch (err) {
      setResponse('Error executing module')
      error('An error occurred while executing the module')
    } finally {
      setExecuting(false)
    }
  }

  const handleDelete = async (module: LMSModule) => {
    try {
      const response = await fetch(`/api/lms/${module.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        success('Module deleted successfully!', 'The LMS module has been removed')
        if (selectedModule?.id === module.id) {
          setSelectedModule(null)
          setResponse('')
        }
        fetchModules()
      } else {
        error('Failed to delete module')
      }
    } catch (err) {
      error('An error occurred while deleting the module')
    }
  }

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    info('Prompt copied to clipboard')
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold font-heading gradient-text flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary-500" />
            LMS Module Management
          </h1>
          <p className="text-text-secondary font-body mt-1">
            Configure and test AI-powered learning modules
          </p>
        </div>
        <Button 
          onClick={() => handleOpenForm()} 
          className="btn-primary shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Module
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Modules List */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold font-heading text-text-primary">Available Modules</h2>
            <Badge variant="primary" className="gap-1">
              <Brain className="w-3 h-3" />
              {modules.length}
            </Badge>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 animate-pulse glass-gradient">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="h-5 w-3/4 bg-primary-500/20 rounded mb-2" />
                      <div className="h-4 w-full bg-primary-500/10 rounded mb-2" />
                      <div className="h-4 w-1/3 bg-primary-500/10 rounded" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((module, index) => (
                <Card 
                  key={module.id} 
                  className={`group p-6 glass-gradient hover-lift cursor-pointer transition-all animate-fade-in-up ${
                    selectedModule?.id === module.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedModule(module)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-text-primary font-heading truncate group-hover:text-primary-500 transition-colors">
                          {module.name}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm font-body line-clamp-2 mb-3">
                        {module.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium font-body">
                          {module.model}
                        </span>
                        <span className="text-xs text-text-muted font-body">
                          {new Date(module.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedModule(module)}
                        className="hover:bg-primary-500/10 hover:text-primary-500"
                        title="Test module"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenForm(module)}
                        className="hover:bg-primary-500/10 hover:text-primary-500"
                        title="Edit module"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyPrompt(module.promptTemplate)}
                        className="hover:bg-primary-500/10 hover:text-primary-500"
                        title="Copy prompt"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(module)}
                        className="hover:bg-danger-500/10 hover:text-danger-500"
                        title="Delete module"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && modules.length === 0 && (
            <Card className="p-12 text-center glass-gradient animate-scale-in">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-text-primary mb-2">
                  No modules yet
                </h3>
                <p className="text-text-secondary font-body mb-6">
                  Get started by creating your first AI-powered LMS module
                </p>
                <Button onClick={() => handleOpenForm()} className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Module
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Module Execution */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-semibold font-heading text-text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            Test Module
          </h2>
          {selectedModule ? (
            <Card className="p-6 glass-gradient">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-primary-500" />
                  <h3 className="text-lg font-semibold font-heading text-text-primary">
                    Testing: {selectedModule.name}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm font-body">
                  {selectedModule.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary font-body mb-2">
                    Input
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-medium bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none"
                    rows={4}
                    placeholder="Enter your input here..."
                  />
                </div>

                <Button
                  onClick={executeModule}
                  disabled={executing || !userInput}
                  className="w-full btn-primary"
                  size="lg"
                >
                  {executing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Executing Module...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Execute Module
                    </>
                  )}
                </Button>

                {response && (
                  <div className="animate-fade-in-up">
                    <label className="block text-sm font-medium text-text-primary font-body mb-2 flex items-center justify-between">
                      <span>Response</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyPrompt(response)}
                        className="h-7 text-xs"
                        leftIcon={<Copy className="w-3 h-3" />}
                      >
                        Copy
                      </Button>
                    </label>
                    <div className="p-4 rounded-xl border border-border-medium bg-surface text-text-primary min-h-[150px] max-h-[400px] overflow-y-auto font-body whitespace-pre-wrap">
                      {response}
                    </div>
                  </div>
                )}

                {executing && (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-2" />
                      <p className="text-text-secondary font-body">Generating response...</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center glass-gradient animate-scale-in">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-text-primary mb-2">
                  Select a module to test
                </h3>
                <p className="text-text-secondary font-body">
                  Choose an LMS module from the list to test it with custom input
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Add/Edit Module Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary-500" />
              {editingModule ? 'Edit LMS Module' : 'Create New LMS Module'}
            </DialogTitle>
            <DialogDescription className="font-body">
              {editingModule ? 'Update the module details below' : 'Configure a new AI-powered learning module'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Module Name"
                placeholder="e.g., Content Generator"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              
              <Select
                label="AI Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                options={AI_MODELS}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary font-body">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border-medium bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none"
                rows={2}
                placeholder="Brief description of what this module does..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary font-body">
                Prompt Template
              </label>
              <textarea
                value={formData.promptTemplate}
                onChange={(e) => setFormData({ ...formData, promptTemplate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border-medium bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none font-mono text-sm"
                rows={6}
                placeholder="Enter the prompt template. Use {input} as placeholder for user input."
                required
              />
              <p className="text-xs text-text-muted font-body">
                Use <code className="px-1.5 py-0.5 bg-primary-500/10 rounded">{`{input}`}</code> as a placeholder for dynamic user input
              </p>
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingModule ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {editingModule ? 'Update Module' : 'Create Module'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Simple Badge component for this page
function Badge({ variant, className, children }: { variant?: 'primary' | 'success' | 'warning' | 'danger'; className?: string; children: React.ReactNode }) {
  const variants = {
    primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
    success: 'bg-success-500/10 text-success-600 dark:text-success-400',
    warning: 'bg-warning-500/10 text-warning-600 dark:text-warning-400',
    danger: 'bg-danger-500/10 text-danger-600 dark:text-danger-400',
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium font-body ${variants[variant || 'primary']} ${className || ''}`}>
      {children}
    </span>
  )
}
