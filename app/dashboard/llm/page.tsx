'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Play, Settings, BarChart3 } from 'lucide-react'

interface LLMModule {
  id: string
  name: string
  description?: string
  promptTemplate: string
  model: string
  createdAt: string
}

export default function LLMPage() {
  const [modules, setModules] = useState<LLMModule[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedModule, setSelectedModule] = useState<LLMModule | null>(null)
  const [userInput, setUserInput] = useState('')
  const [response, setResponse] = useState('')
  const [executing, setExecuting] = useState(false)
  const [newModule, setNewModule] = useState({
    name: '',
    description: '',
    promptTemplate: '',
    model: 'gpt-3.5-turbo'
  })

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    try {
      const response = await fetch('/api/llm')
      if (response.ok) {
        const data = await response.json()
        setModules(data)
      }
    } catch (error) {
      console.error('Error fetching modules:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newModule),
      })

      if (res.ok) {
        setNewModule({ name: '', description: '', promptTemplate: '', model: 'gpt-3.5-turbo' })
        setShowAddForm(false)
        fetchModules()
      }
    } catch (error) {
      console.error('Error adding module:', error)
    }
  }

  const executeModule = async () => {
    if (!selectedModule || !userInput) return

    setExecuting(true)
    setResponse('')

    try {
      const res = await fetch('/api/llm/execute', {
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
      } else {
        setResponse('Error executing module')
      }
    } catch (error) {
      setResponse('Error executing module')
    } finally {
      setExecuting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading LLM modules...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">LLM Module Management</h1>
        <Button onClick={() => setShowAddForm(true)} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Module
        </Button>
      </div>

      {/* Add Module Form */}
      {showAddForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Add New LLM Module</h2>
          <form onSubmit={handleAddModule} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Module Name</label>
                <input
                  type="text"
                  value={newModule.name}
                  onChange={(e) => setNewModule({...newModule, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Model</label>
                <select
                  value={newModule.model}
                  onChange={(e) => setNewModule({...newModule, model: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-christ-gold"
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  <option value="claude-3-haiku">Claude 3 Haiku</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Description</label>
              <textarea
                value={newModule.description}
                onChange={(e) => setNewModule({...newModule, description: e.target.value})}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Prompt Template</label>
              <textarea
                value={newModule.promptTemplate}
                onChange={(e) => setNewModule({...newModule, promptTemplate: e.target.value})}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
                rows={4}
                placeholder="Enter the prompt template. Use {input} as placeholder for user input."
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="btn-primary">
                Add Module
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Modules List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Available Modules</h2>
          {modules.map((module) => (
            <Card key={module.id} className="p-6 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{module.name}</h3>
                  <p className="text-white/70 text-sm mb-2">{module.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-christ-blue/20 text-christ-blue rounded text-xs">
                      {module.model}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedModule(module)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-xs text-white/50">
                Created {new Date(module.createdAt).toLocaleDateString()}
              </div>
            </Card>
          ))}

          {modules.length === 0 && (
            <Card className="p-12 text-center">
              <div className="text-white/70">
                No LLM modules found. Add your first module!
              </div>
            </Card>
          )}
        </div>

        {/* Module Execution */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Test Module</h2>
          {selectedModule ? (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Testing: {selectedModule.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Input
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold resize-none"
                    rows={4}
                    placeholder="Enter your input here..."
                  />
                </div>

                <Button
                  onClick={executeModule}
                  disabled={executing || !userInput}
                  className="w-full btn-primary"
                >
                  {executing ? 'Executing...' : 'Execute Module'}
                </Button>

                {response && (
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Response
                    </label>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-white/80 min-h-[100px]">
                      {response}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <div className="text-white/70">
                Select a module to test it
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}