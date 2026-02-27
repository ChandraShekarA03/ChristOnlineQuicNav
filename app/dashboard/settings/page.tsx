'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Database, Shield, Mail, Key } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Mail }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-christ-blue-dark">System Settings</h1>
        <p className="text-christ-blue text-lg mt-1">Configure system preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Card className="card-professional p-6">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-christ-blue text-white'
                    : 'text-christ-blue-dark hover:bg-christ-ivory/20'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <Card className="card-professional p-8 lg:col-span-3">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-christ-gold" />
                <h2 className="text-2xl font-semibold text-christ-blue-dark">General Settings</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Christ Faculty Hub"
                    className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark focus:outline-none focus:ring-2 focus:ring-christ-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                    Default Language
                  </label>
                  <select className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark focus:outline-none focus:ring-2 focus:ring-christ-gold">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="kn">Kannada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-christ-blue-dark mb-2">
                    Time Zone
                  </label>
                  <select className="w-full px-4 py-3 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark focus:outline-none focus:ring-2 focus:ring-christ-gold">
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button className="btn-primary">
                  Save Changes
                </Button>
                <Button variant="outline" className="border-christ-blue/30 text-christ-blue hover:bg-christ-blue/10">
                  Reset to Defaults
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-christ-gold" />
                <h2 className="text-2xl font-semibold text-christ-blue-dark">Security Settings</h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-christ-ivory/20 rounded-lg">
                  <h3 className="font-semibold text-christ-blue-dark mb-2">Password Policy</h3>
                  <p className="text-sm text-christ-blue-dark/70 mb-4">
                    Configure password requirements for user accounts.
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-christ-blue-dark">Minimum 8 characters</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-christ-blue-dark">Require uppercase letters</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-christ-blue-dark">Require numbers</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-christ-ivory/20 rounded-lg">
                  <h3 className="font-semibold text-christ-blue-dark mb-2">Session Management</h3>
                  <p className="text-sm text-christ-blue-dark/70 mb-4">
                    Configure session timeout and security settings.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-christ-blue-dark mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue="60"
                      className="w-full px-4 py-2 bg-white border border-christ-ivory/50 rounded-lg text-christ-blue-dark focus:outline-none focus:ring-2 focus:ring-christ-gold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button className="btn-primary">
                  Save Security Settings
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-christ-gold" />
                <h2 className="text-2xl font-semibold text-christ-blue-dark">Database Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50/10 border border-green-200/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-christ-blue-dark">Database Status</span>
                  </div>
                  <p className="text-sm text-christ-blue-dark/70">Connected - SQLite</p>
                </div>

                <div className="p-4 bg-christ-ivory/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-5 h-5 text-christ-blue" />
                    <span className="font-semibold text-christ-blue-dark">Last Backup</span>
                  </div>
                  <p className="text-sm text-christ-blue-dark/70">Never</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-christ-blue-dark">Database Actions</h3>
                <div className="flex gap-4">
                  <Button variant="outline" className="border-christ-blue/30 text-christ-blue hover:bg-christ-blue/10">
                    <Database className="w-4 h-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline" className="border-green-300/30 text-green-600 hover:bg-green-50/10">
                    Optimize Database
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-christ-gold" />
                <h2 className="text-2xl font-semibold text-christ-blue-dark">Notification Settings</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-christ-blue-dark mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-christ-ivory/20 rounded-lg">
                      <div>
                        <div className="font-medium text-christ-blue-dark">New User Registrations</div>
                        <div className="text-sm text-christ-blue-dark/70">Notify admins when new users register</div>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-christ-ivory/20 rounded-lg">
                      <div>
                        <div className="font-medium text-christ-blue-dark">System Alerts</div>
                        <div className="text-sm text-christ-blue-dark/70">Critical system notifications</div>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-christ-ivory/20 rounded-lg">
                      <div>
                        <div className="font-medium text-christ-blue-dark">Weekly Reports</div>
                        <div className="text-sm text-christ-blue-dark/70">Send weekly usage summaries</div>
                      </div>
                      <input type="checkbox" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button className="btn-primary">
                  Save Notification Settings
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}