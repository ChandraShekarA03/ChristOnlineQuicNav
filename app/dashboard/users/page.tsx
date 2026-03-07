'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Shield, 
  Mail, 
  Calendar,
  UserPlus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react'

const users = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@christuniversity.in',
    role: 'ADMIN',
    department: 'Computer Science',
    status: 'active',
    joined: '2024-01-15',
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael.chen@christuniversity.in',
    role: 'FACULTY',
    department: 'Mathematics',
    status: 'active',
    joined: '2024-02-20',
    avatar: 'MC'
  },
  {
    id: 3,
    name: 'Dr. Anna Martinez',
    email: 'anna.martinez@christuniversity.in',
    role: 'FACULTY',
    department: 'Physics',
    status: 'active',
    joined: '2024-03-10',
    avatar: 'AM'
  },
  {
    id: 4,
    name: 'Prof. David Wilson',
    email: 'david.wilson@christuniversity.in',
    role: 'FACULTY',
    department: 'Chemistry',
    status: 'inactive',
    joined: '2024-01-05',
    avatar: 'DW'
  },
  {
    id: 5,
    name: 'Dr. Emily Brown',
    email: 'emily.brown@christuniversity.in',
    role: 'SUPER_ADMIN',
    department: 'Administration',
    status: 'active',
    joined: '2023-12-01',
    avatar: 'EB'
  },
  {
    id: 6,
    name: 'Prof. James Taylor',
    email: 'james.taylor@christuniversity.in',
    role: 'FACULTY',
    department: 'Biology',
    status: 'active',
    joined: '2024-04-18',
    avatar: 'JT'
  },
]

const roles = [
  { value: 'all', label: 'All Roles' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'FACULTY', label: 'Faculty' },
]

const departments = [
  { value: 'all', label: 'All Departments' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Administration', label: 'Administration' },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment
    return matchesSearch && matchesRole && matchesDepartment
  })

  const stats = [
    { label: 'Total Users', value: '234', change: '+12 this week', icon: Users },
    { label: 'Active Now', value: '47', change: 'Currently online', icon: CheckCircle },
    { label: 'Admins', value: '8', change: 'Full access', icon: Shield },
    { label: 'Faculty', value: '226', change: 'Teaching staff', icon: Mail },
  ]

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'danger'
      case 'ADMIN': return 'warning'
      case 'FACULTY': return 'default'
      default: return 'default'
    }
  }

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
          <h1 className="text-3xl font-bold gradient-text font-heading">User Management</h1>
          <p className="text-secondary font-body mt-1">
            Manage faculty accounts and permissions
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
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
                    <p className="text-xs text-secondary mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-100/50 dark:bg-violet-900/20">
                    <stat.icon className="w-6 h-6 text-violet-600" />
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
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
        >
          {roles.map(role => (
            <option key={role.value} value={role.value}>{role.label}</option>
          ))}
        </select>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
        >
          {departments.map(dept => (
            <option key={dept.value} value={dept.value}>{dept.label}</option>
          ))}
        </select>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-violet-200/20 dark:border-violet-800/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-violet-50/50 dark:bg-violet-900/20 border-b border-violet-200/20 dark:border-violet-800/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100 dark:divide-violet-800">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.03)' }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          size="md"
                          fallback={user.avatar}
                          className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
                        />
                        <div>
                          <p className="font-semibold text-primary font-heading">{user.name}</p>
                          <p className="text-sm text-secondary font-body">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                        {user.role.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">{user.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-success animate-pulse' : 'bg-gray-400'}`} />
                        <span className="text-sm capitalize text-secondary">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-violet-100/50 dark:hover:bg-violet-900/20 text-violet-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-red-100/50 dark:hover:bg-red-900/20 text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
