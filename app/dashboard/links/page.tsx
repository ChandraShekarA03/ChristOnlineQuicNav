'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react'

interface Link {
  id: string
  title: string
  url: string
  description?: string
  category: string
  department?: string
  createdAt: string
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    department: ''
  })

  const fetchLinks = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category', selectedCategory)

      const response = await fetch(`/api/links?${params}`)
      if (response.ok) {
        const data = await response.json()
        setLinks(data)
      }
    } catch (error) {
      console.error('Error fetching links:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLink),
      })

      if (response.ok) {
        setNewLink({ title: '', url: '', description: '', category: '', department: '' })
        setShowAddForm(false)
        fetchLinks()
      }
    } catch (error) {
      console.error('Error adding link:', error)
    }
  }

  const categories = ['Academic', 'Research', 'Administrative', 'Student Services', 'Library', 'IT Support']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading links...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Link Management</h1>
        <Button onClick={() => setShowAddForm(true)} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <input
                type="text"
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-christ-gold"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Add Link Form */}
      {showAddForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Link</h2>
          <form onSubmit={handleAddLink} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">URL</label>
                <input
                  type="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Description</label>
              <textarea
                value={newLink.description}
                onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select
                  value={newLink.category}
                  onChange={(e) => setNewLink({...newLink, category: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-christ-gold"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Department (Optional)</label>
                <input
                  type="text"
                  value={newLink.department}
                  onChange={(e) => setNewLink({...newLink, department: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christ-gold"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="btn-primary">
                Add Link
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Card key={link.id} className="p-6 hover:scale-105 transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{link.title}</h3>
                <p className="text-white/70 text-sm mb-2">{link.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-christ-blue/20 text-christ-blue rounded text-xs">
                    {link.category}
                  </span>
                  {link.department && (
                    <span className="px-2 py-1 bg-christ-gold/20 text-christ-gold rounded text-xs">
                      {link.department}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-white/50">
              Added {new Date(link.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}
      </div>

      {links.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-white/70">
            No links found. {searchTerm || selectedCategory ? 'Try adjusting your filters.' : 'Add your first link!'}
          </div>
        </Card>
      )}
    </div>
  )
}