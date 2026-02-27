'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Shield, User, Crown, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name?: string
  email: string
  role: string
  department?: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        // Fallback to mock data if API fails
        setUsers([
          {
            id: '1',
            name: 'Admin User',
            email: 'admin@christuniversity.in',
            role: 'SUPER_ADMIN',
            department: 'IT Administration',
            createdAt: new Date().toISOString()
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      // Fallback to mock data
      setUsers([
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@christuniversity.in',
          role: 'SUPER_ADMIN',
          department: 'IT Administration',
          createdAt: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <Crown className="w-4 h-4 text-christ-gold" />
      case 'ADMIN':
        return <Shield className="w-4 h-4 text-christ-blue" />
      default:
        return <User className="w-4 h-4 text-christ-blue-dark/60" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-christ-gold/20 text-christ-gold border-christ-gold/50'
      case 'ADMIN':
        return 'bg-christ-blue/20 text-christ-blue border-christ-blue/50'
      default:
        return 'bg-christ-ivory/20 text-christ-blue-dark border-christ-ivory/50'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-christ-blue-dark">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-christ-blue-dark">User Management</h1>
          <p className="text-christ-blue text-lg mt-1">Manage faculty and administrative accounts</p>
        </div>
        <Button onClick={() => router.push('/dashboard/users/new')} className="btn-primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="card-professional overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-christ-ivory/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-christ-blue-dark uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-christ-blue-dark uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-christ-blue-dark uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-christ-blue-dark uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-christ-blue-dark uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-christ-ivory/20">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-christ-ivory/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-christ-blue/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-christ-blue" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-christ-blue-dark">
                          {user.name || 'Unnamed User'}
                        </div>
                        <div className="text-sm text-christ-blue-dark/70">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRoleIcon(user.role)}
                      <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-christ-blue-dark/80">
                    {user.department || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-christ-blue-dark/60">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-christ-blue/30 text-christ-blue hover:bg-christ-blue/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-300/30 text-red-600 hover:bg-red-50/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {users.length === 0 && (
        <Card className="card-professional p-12 text-center">
          <User className="w-16 h-16 text-christ-blue/30 mx-auto mb-4" />
          <div className="text-christ-blue-dark/70 text-lg font-medium mb-2">
            No users found
          </div>
          <div className="text-christ-blue-dark/50 mb-6">
            Get started by adding your first faculty or administrative user.
          </div>
          <Button onClick={() => router.push('/dashboard/users/new')} className="btn-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </Card>
      )}

      {/* Role Legend */}
      <Card className="card-professional p-6">
        <h3 className="text-xl font-semibold text-christ-blue-dark mb-6 flex items-center">
          <Shield className="w-5 h-5 text-christ-gold mr-2" />
          Role Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-christ-ivory/20">
            <User className="w-6 h-6 text-christ-blue-dark/60 mt-1" />
            <div>
              <div className="text-christ-blue-dark font-semibold mb-1">Faculty</div>
              <div className="text-christ-blue-dark/70 text-sm">Basic access to links and LLM modules for academic work</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-christ-blue/10">
            <Shield className="w-6 h-6 text-christ-blue mt-1" />
            <div>
              <div className="text-christ-blue-dark font-semibold mb-1">Admin</div>
              <div className="text-christ-blue-dark/70 text-sm">Manage links, LLM modules, and oversee user accounts</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-christ-gold/10">
            <Crown className="w-6 h-6 text-christ-gold mt-1" />
            <div>
              <div className="text-christ-blue-dark font-semibold mb-1">Super Admin</div>
              <div className="text-christ-blue-dark/70 text-sm">Full system access, configuration, and user management</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}