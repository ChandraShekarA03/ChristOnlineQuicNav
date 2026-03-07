'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Plus, Search, Edit, Trash2, ExternalLink, Link2, X, Loader2, AlertCircle, FolderOpen } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { getAllLinks, createLink, updateLink, deleteLink, LinkData } from '@/lib/firestore'
import toast from 'react-hot-toast'

interface Link extends LinkData {
  id: string
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
  const { user } = useAuth()

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
      const allLinks = await getAllLinks()
      setLinks(allLinks as Link[])
    } catch (err) {
      toast.error('Failed to fetch links')
    } finally {
      setLoading(false)
    }
  }, [])

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
    if (!user) {
      toast.error('Please sign in')
      return
    }

    setIsSubmitting(true)
    try {
      if (selectedLink) {
        await updateLink(selectedLink.id, formData)
        toast.success('Link updated successfully!')
      } else {
        await createLink({
          ...formData,
          userId: user.uid
        })
        toast.success('Link created successfully!')
      }
      setIsDialogOpen(false)
      fetchLinks()
      setFormData({ title: '', url: '', description: '', category: '', department: '' })
    } catch (err: any) {
      toast.error(err.message || 'Failed to save link')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedLink) return

    setDeleting(true)
    try {
      await deleteLink(selectedLink.id)
      toast.success('Link deleted successfully!')
      setIsDeleteDialogOpen(false)
      fetchLinks()
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete link')
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text font-heading">Link Management</h1>
          <p className="text-secondary font-body mt-1">
            Manage and organize important faculty resources
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 border-violet-200/20 dark:border-violet-800/20 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
          </div>
        </Card>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6 border-violet-200/20 dark:border-violet-800/20">
              <div className="animate-pulse space-y-4">
                <div className="h-5 w-3/4 bg-violet-200 dark:bg-violet-800 rounded" />
                <div className="h-4 w-full bg-violet-100 dark:bg-violet-900 rounded" />
                <div className="h-4 w-2/3 bg-violet-100 dark:bg-violet-900 rounded" />
                <div className="flex gap-2 pt-4">
                  <div className="h-8 w-8 bg-violet-100 dark:bg-violet-900 rounded" />
                  <div className="h-8 w-8 bg-violet-100 dark:bg-violet-900 rounded" />
                  <div className="h-8 w-8 bg-violet-100 dark:bg-violet-900 rounded" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Links Grid */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                layout
              >
                <Card className="group p-6 border-violet-200/20 dark:border-violet-800/20 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/10 to-indigo-500/10 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-all duration-300">
                          <Link2 className="w-4 h-4 text-violet-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-primary font-heading truncate group-hover:text-violet-600 transition-colors">
                          {link.title}
                        </h3>
                      </div>
                      {link.description && (
                        <p className="text-secondary text-sm font-body line-clamp-2 mb-3">
                          {link.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 bg-violet-100/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg text-xs font-medium font-body">
                          {link.category}
                        </span>
                        {link.department && (
                          <span className="px-2.5 py-1 bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-medium font-body">
                            {link.department}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-violet-100 dark:border-violet-800">
                    <span className="text-xs text-gray-400 font-body">
                      {new Date(link.createdAt!).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                          className="hover:bg-violet-100/50 dark:hover:bg-violet-900/20 text-violet-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenDialog(link)}
                          className="hover:bg-violet-100/50 dark:hover:bg-violet-900/20 text-violet-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDeleteDialog(link)}
                          className="hover:bg-red-100/50 dark:hover:bg-red-900/20 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredLinks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 text-center border-violet-200/20 dark:border-violet-800/20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-10 h-10 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-primary mb-2">
                {searchTerm || selectedCategory || selectedDepartment
                  ? 'No links found'
                  : 'No links yet'}
              </h3>
              <p className="text-secondary font-body mb-6">
                {searchTerm || selectedCategory || selectedDepartment
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first link to the faculty hub'}
              </p>
              {!searchTerm && !selectedCategory && !selectedDepartment && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={() => handleOpenDialog()} className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Link
                  </Button>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Add/Edit Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-heading">
                  {selectedLink ? 'Edit Link' : 'Add New Link'}
                </DialogTitle>
                <DialogDescription className="font-body">
                  {selectedLink ? 'Update the link details below' : 'Fill in the details to add a new link'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2 font-body">Title</label>
                  <input
                    placeholder="e.g., Course Materials"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2 font-body">URL</label>
                  <input
                    placeholder="https://example.com"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2 font-body">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body resize-none"
                    rows={3}
                    placeholder="Brief description of the link..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-body">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
                      required
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-body">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
                    >
                      <option value="">Select department</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <DialogFooter className="mt-6 flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                    className="border-violet-200 dark:border-violet-800 hover:bg-violet-100/50 dark:hover:bg-violet-900/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30"
                    disabled={isSubmitting}
                  >
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
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {isDeleteDialogOpen && (
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  Delete Link
                </DialogTitle>
                <DialogDescription className="font-body">
                  Are you sure you want to delete this link? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              {selectedLink && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <p className="font-semibold text-primary font-heading">{selectedLink.title}</p>
                  <p className="text-sm text-secondary font-body mt-1">{selectedLink.url}</p>
                </div>
              )}

              <DialogFooter className="mt-6 flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={deleting}
                  className="border-violet-200 dark:border-violet-800"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30"
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
        )}
      </AnimatePresence>
    </div>
  )
}
