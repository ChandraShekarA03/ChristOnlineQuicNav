'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, UserPlus, Shield, Crown, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FACULTY',
    department: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          department: formData.department || null
        }),
      })

      if (response.ok) {
        router.push('/dashboard/users')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create user')
      }
    } catch (error) {
      setError('An error occurred while creating the user')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <Crown className="w-5 h-5 text-christ-gold" />
      case 'ADMIN':
        return <Shield className="w-5 h-5 text-christ-blue" />
      default:
        return <User className="w-5 h-5 text-christ-blue-dark/60" />
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Full system access and configuration privileges'
      case 'ADMIN':
        return 'Manage links, LLM modules, and oversee user accounts'
      default:
        return 'Basic access to links and LLM modules for academic work'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="border-christ-blue/30 text-christ-blue hover:bg-christ-blue/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-christ-blue-dark">Add New User</h1>
          <p className="text-christ-blue text-lg mt-1">Create a new faculty or administrative account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <Card className="card-professional p-8 lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50/10 border border-red-200/30 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark placeholder-christ-blue-dark/50 focus:outline-none focus:ring-2 focus:ring-christ-gold focus:border-transparent transition-all"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark placeholder-christ-blue-dark/50 focus:outline-none focus:ring-2 focus:ring-christ-gold focus:border-transparent transition-all"
                  placeholder="user@christuniversity.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark placeholder-christ-blue-dark/50 focus:outline-none focus:ring-2 focus:ring-christ-gold focus:border-transparent transition-all"
                placeholder="e.g., Computer Science, Mathematics"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark focus:outline-none focus:ring-2 focus:ring-christ-gold focus:border-transparent transition-all"
                required
              >
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark placeholder-christ-blue-dark/50 focus:outline-none focus:ring-2 focus:ring-christ-gold focus:border-transparent transition-all"
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark placeholder-christ-blue-dark/50 focus:outline-none focus:ring-2 focus:ring-christ-gold focus:border-transparent transition-all"
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? (
                  'Creating User...'
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create User Account
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-christ-blue/30 text-christ-blue hover:bg-christ-blue/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Role Information */}
        <Card className="card-professional p-6">
          <h3 className="text-xl font-semibold text-christ-blue-dark mb-6 flex items-center">
            {getRoleIcon(formData.role)}
            <span className="ml-2">Role Information</span>
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-christ-ivory/20">
              <div className="flex items-center gap-3 mb-2">
                {getRoleIcon(formData.role)}
                <span className="font-semibold text-christ-blue-dark">
                  {formData.role.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-christ-blue-dark/70">
                {getRoleDescription(formData.role)}
              </p>
            </div>

            <div className="border-t border-christ-ivory/30 pt-4">
              <h4 className="font-semibold text-christ-blue-dark mb-3">Password Requirements</h4>
              <ul className="text-sm text-christ-blue-dark/70 space-y-1">
                <li>• Minimum 6 characters</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Add numbers for security</li>
                <li>• Use special characters when possible</li>
              </ul>
            </div>

            <div className="border-t border-christ-ivory/30 pt-4">
              <h4 className="font-semibold text-christ-blue-dark mb-3">Email Format</h4>
              <p className="text-sm text-christ-blue-dark/70">
                Use the official Christ University email format:
                <br />
                <code className="bg-christ-ivory/30 px-2 py-1 rounded text-xs">
                  firstname.lastname@christuniversity.in
                </code>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}