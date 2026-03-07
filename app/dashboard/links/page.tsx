'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toast'
import { Plus, Search, Edit, Trash2, ExternalLink, Link2, X, Loader2, AlertCircle } from 'lucide-react'

interface Link {
  id: string
  title: string
  url: string
  description?: string
  category: string
  department?: string
  createdAt: string
  updatedAt: string
}

const CATEGORIES = [
  { value: 'academic', label: 'Academic' },
  { value: 'research', label: 'Research' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'student-services', label: 'Student Services' },
  { value: 'library', label: 'Library' },
  { value: 'it-support', label: 'IT Support' },
  { value: 'examination', label: 'Examination' },
  { value: 'other', label: 'Other' },
]

const DEPARTMENTS = [
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'english', label: 'English' },
  { value: 'history', label: 'History' },
  { value: 'economics', label: 'Economics' },
  { value: 'management', label: 'Management' },
  { value: 'commerce', label: 'Commerce' },
]

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  const { success, error, info } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    department: ''
  })

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedDepartment) params.append('department', selectedDepartment)

      const response = await fetch(`/api/links?${params}`)
      if (response.ok) {
        const data = await response.json()
        setLinks(data)
      } else {
        error('Failed to fetch links')
      }
    } catch (err) {
      error('An error occurred while fetching links')
    } finally {
      setLoading(false)
    }
  }, [searchTerm, selectedCategory, selectedDepartment, error])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const handleOpenDialog = (link?: Link) => {
    if (link) {
      setSelectedLink(link)
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description || '',
        category: link.category,
        department: link.department || ''
      })
    } else {
      setSelectedLink(null)
      setFormData({
        title: '',
        url: '',
        description: '',
        category: '',
        department: ''
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = selectedLink ? `/api/links/${selectedLink.id}` : '/api/links'
      const method = selectedLink ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        success(
          selectedLink ? 'Link updated successfully!' : 'Link created successfully!',
          selectedLink ? 'The link has been updated' : 'The new link has been added'
        )
        setIsDialogOpen(false)
        fetchLinks()
        setFormData({ title: '', url: '', description: '', category: '', department: '' })
      } else {
        const data = await response.json()
        error(data.error || 'Failed to save link')
      }
    } catch (err) {
      error('An error occurred while saving the link')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedLink) return
    
    setDeleting(true)
    try {
      const response = await fetch(`/api/links/${selectedLink.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        success('Link deleted successfully!', 'The link has been removed')
        setIsDeleteDialogOpen(false)
        fetchLinks()
      } else {
        error('Failed to delete link')
      }
    } catch (err) {
      error('An error occurred while deleting the link')
    } finally {
      setDeleting(false)
    }
  }

  const openDeleteDialog = (link: Link) => {
    setSelectedLink(link)
    setIsDeleteDialogOpen(true)
  }

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || link.category === selectedCategory
    const matchesDepartment = !selectedDepartment || link.department === selectedDepartment
    return matchesSearch && matchesCategory && matchesDepartment
  })

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold font-heading gradient-text">Link Management</h1>
          <p className="text-text-secondary font-body mt-1">
            Manage and organize important faculty links
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="btn-primary shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Link
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 glass-gradient animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            placeholder="All Categories"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={CATEGORIES}
          />
          <Select
            placeholder="All Departments"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            options={DEPARTMENTS}
          />
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="h-5 w-3/4 bg-primary-500/20 rounded mb-2" />
                  <div className="h-4 w-full bg-primary-500/10 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-primary-500/10 rounded" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="h-8 w-8 bg-primary-500/20 rounded" />
                <div className="h-8 w-8 bg-primary-500/20 rounded" />
                <div className="h-8 w-8 bg-primary-500/20 rounded" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Links Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link, index) => (
            <Card 
              key={link.id} 
              className="group p-6 hover-lift glass-gradient animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-text-primary font-heading truncate group-hover:text-primary-500 transition-colors">
                      {link.title}
                    </h3>
                  </div>
                  {link.description && (
                    <p className="text-text-secondary text-sm font-body line-clamp-2 mb-3">
                      {link.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium font-body">
                      {link.category}
                    </span>
                    {link.department && (
                      <span className="px-2.5 py-1 bg-success-500/10 text-success-600 dark:text-success-400 rounded-full text-xs font-medium font-body">
                        {link.department}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border-light">
                <span className="text-xs text-text-muted font-body">
                  {new Date(link.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                    className="hover:bg-primary-500/10 hover:text-primary-500"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenDialog(link)}
                    className="hover:bg-primary-500/10 hover:text-primary-500"
                    title="Edit link"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDeleteDialog(link)}
                    className="hover:bg-danger-500/10 hover:text-danger-500"
                    title="Delete link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredLinks.length === 0 && (
        <Card className="p-12 text-center glass-gradient animate-scale-in">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold font-heading text-text-primary mb-2">
              {searchTerm || selectedCategory || selectedDepartment 
                ? 'No links found' 
                : 'No links yet'}
            </h3>
            <p className="text-text-secondary font-body mb-6">
              {searchTerm || selectedCategory || selectedDepartment
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first link to the faculty hub'}
            </p>
            {!searchTerm && !selectedCategory && !selectedDepartment && (
              <Button onClick={() => handleOpenDialog()} className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Link
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg animate-scale-in">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {selectedLink ? 'Edit Link' : 'Add New Link'}
            </DialogTitle>
            <DialogDescription className="font-body">
              {selectedLink ? 'Update the link details below' : 'Fill in the details to add a new link to the faculty hub'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              placeholder="e.g., Course Materials"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            
            <Input
              label="URL"
              placeholder="https://example.com"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary font-body">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border-medium bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none"
                rows={3}
                placeholder="Brief description of the link..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={CATEGORIES}
                placeholder="Select category"
                required
              />
              
              <Select
                label="Department (Optional)"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                options={DEPARTMENTS}
                placeholder="Select department"
              />
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {selectedLink ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  selectedLink ? 'Update Link' : 'Create Link'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2 text-danger">
              <AlertCircle className="w-5 h-5" />
              Delete Link
            </DialogTitle>
            <DialogDescription className="font-body">
              Are you sure you want to delete this link? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedLink && (
            <div className="p-4 bg-danger-500/10 rounded-lg border border-danger-500/20">
              <p className="font-medium text-text-primary font-heading">{selectedLink.title}</p>
              <p className="text-sm text-text-secondary font-body mt-1">{selectedLink.url}</p>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="bg-danger hover:bg-danger/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
