'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { createUserDocument, getAllUsers, UserData, updateUserDocument } from '@/lib/firestore'
import { useAuth } from '@/lib/auth-context'
import { Loading } from '@/components/ui/loading'
import {
  UserPlus,
  Users,
  Search,
  Edit2,
  Trash2,
  Shield,
  Mail,
  Building,
  X,
  Check,
  AlertCircle
} from 'lucide-react'

type UserRole = 'FACULTY' | 'ADMIN' | 'SUPER_ADMIN'

export default function UsersPage() {
  const { userData: currentUser } = useAuth()
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingUser, setEditingUser] = useState<UserData | null>(null)

  // Form state for creating/editing user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    role: 'FACULTY' as UserRole
  })

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN'

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const allUsers = await getAllUsers()
      setUsers(allUsers)
    } catch (err: any) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      })

      // Create user document in Firestore
      await createUserDocument(userCredential.user.uid, {
        email: formData.email,
        name: formData.name,
        department: formData.department,
        role: formData.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      setSuccess('User created successfully!')
      setShowCreateModal(false)
      setFormData({ name: '', email: '', password: '', department: '', role: 'FACULTY' })
      fetchUsers()
    } catch (err: any) {
      console.error('Error creating user:', err)
      setError(err.message || 'Failed to create user')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (uid: string, updates: Partial<UserData>) => {
    try {
      await updateUserDocument(uid, updates)
      setSuccess('User updated successfully!')
      setEditingUser(null)
      fetchUsers()
    } catch (err: any) {
      setError('Failed to update user')
    }
  }

  const handleDeleteUser = async (uid: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}? This action cannot be undone.`)) {
      return
    }

    try {
      // Note: To fully delete a user, you need to delete from both Auth and Firestore
      // For security, this should be done with Firebase Admin SDK on the server
      // This is a client-side limitation - we can only delete from Firestore here
      setError('User deletion requires server-side operation. Please delete from Firebase Console.')
    } catch (err: any) {
      setError('Failed to delete user')
    }
  }

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'default'
      case 'ADMIN': return 'warning'
      case 'FACULTY': return 'secondary'
      default: return 'secondary'
    }
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning-600" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              You don&apos;t have permission to access this page. Only Admins and Super Admins can manage users.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading gradient-text">User Management</h1>
          <p className="text-text-secondary font-body">Manage faculty accounts and permissions</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Add New User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-gradient">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary-500/10">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Users</p>
                <p className="text-2xl font-bold font-heading">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-gradient">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success-500/10">
                <Shield className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Faculty Members</p>
                <p className="text-2xl font-bold font-heading">
                  {users.filter(u => u.role === 'FACULTY').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-gradient">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning-500/10">
                <Shield className="w-6 h-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Admins</p>
                <p className="text-2xl font-bold font-heading">
                  {users.filter(u => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {error && (
        <Card className="border-danger/50 bg-danger-500/10">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-danger-600" />
            <p className="text-danger-600">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError('')}
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="border-success/50 bg-success-500/10">
          <CardContent className="p-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-success-600" />
            <p className="text-success-600">{success}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSuccess('')}
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card className="glass-gradient">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="glass-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Users className="w-5 h-5 text-primary-500" />
            All Users
          </CardTitle>
          <CardDescription className="font-body">
            {filteredUsers.length} of {users.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loading size="lg" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light">
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Department</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Last Login</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.uid} className="border-b border-light hover:bg-surface-hover transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{user.name || 'N/A'}</p>
                            <p className="text-sm text-text-muted">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Building className="w-4 h-4" />
                          {user.department || 'N/A'}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-muted">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : 'Never'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingUser(user)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.uid!, user.email)}
                            className="text-danger hover:text-danger"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md glass-gradient">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-heading">
                  <UserPlus className="w-5 h-5 text-primary-500" />
                  Create New User
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    leftIcon={<Building className="w-4 h-4" />}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@christuniversity.in"
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <Input
                    label="Department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block font-body">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full px-4 py-2 bg-surface border border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body"
                  >
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Creating...' : 'Create User'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md glass-gradient">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Edit2 className="w-5 h-5 text-primary-500" />
                  Edit User
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingUser(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdateUser(editingUser.uid!, {
                  name: editingUser.name,
                  department: editingUser.department,
                  role: editingUser.role
                })
              }} className="space-y-4">
                <div>
                  <Input
                    label="Full Name"
                    value={editingUser.name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>

                <div>
                  <Input
                    label="Email (Read-only)"
                    value={editingUser.email}
                    disabled
                    className="bg-surface-elevated"
                  />
                </div>

                <div>
                  <Input
                    label="Department"
                    value={editingUser.department || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block font-body">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full px-4 py-2 bg-surface border border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body"
                  >
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Update User
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
