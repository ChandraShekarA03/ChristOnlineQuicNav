'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  Moon,
  Sun,
  Monitor,
  Check,
  Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'

const notifications = [
  { id: 1, label: 'Email notifications', description: 'Receive email updates about your account', enabled: true },
  { id: 2, label: 'Push notifications', description: 'Get push notifications in your browser', enabled: false },
  { id: 3, label: 'Weekly digest', description: 'Receive a weekly summary of activities', enabled: true },
  { id: 4, label: 'Security alerts', description: 'Get notified about security-related events', enabled: true },
]

const privacyOptions = [
  { id: 'public', label: 'Public', description: 'Anyone can see your profile' },
  { id: 'faculty', label: 'Faculty Only', description: 'Only faculty members can see your profile' },
  { id: 'private', label: 'Private', description: 'Only you can see your profile' },
]

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('en')
  const [selectedPrivacy, setSelectedPrivacy] = useState('faculty')

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Settings saved successfully!')
    setSaving(false)
  }

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
  ]

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
          <h1 className="text-3xl font-bold gradient-text font-heading">Settings</h1>
          <p className="text-secondary font-body mt-1">
            Manage your account preferences and settings
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="border-violet-200/20 dark:border-violet-800/20 sticky top-24">
            <CardContent className="p-4 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-violet-100/50 dark:hover:bg-violet-900/20 text-secondary hover:text-primary"
                >
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-violet-200/20 dark:border-violet-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <User className="w-5 h-5 text-violet-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-body">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Dr. Sarah Johnson"
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-body">Email</label>
                    <input
                      type="email"
                      defaultValue="sarah.johnson@christuniversity.in"
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-body">Department</label>
                    <select className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body">
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-body">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91 9876543210"
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-2 border-violet-100 dark:border-violet-800 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-violet-200/20 dark:border-violet-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Palette className="w-5 h-5 text-violet-600" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how the application looks for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-3 font-body">Theme Preference</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                          theme === option.id
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                            : 'border-violet-200 dark:border-violet-800 hover:border-violet-300 dark:hover:border-violet-700'
                        }`}
                      >
                        <option.icon className={`w-6 h-6 ${theme === option.id ? 'text-violet-600' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${theme === option.id ? 'text-primary' : 'text-secondary'}`}>
                          {option.label}
                        </span>
                        {theme === option.id && (
                          <Check className="w-4 h-4 text-violet-600 mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-violet-200/20 dark:border-violet-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Bell className="w-5 h-5 text-violet-600" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-violet-50/30 dark:bg-violet-900/10 border border-violet-200/20 dark:border-violet-800/20"
                  >
                    <div>
                      <p className="font-semibold text-primary font-heading">{notification.label}</p>
                      <p className="text-sm text-secondary font-body mt-0.5">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-violet-200/20 dark:border-violet-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Shield className="w-5 h-5 text-violet-600" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control who can see your profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {privacyOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedPrivacy(option.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedPrivacy === option.id
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                          : 'border-violet-200 dark:border-violet-800 hover:border-violet-300 dark:hover:border-violet-700'
                      }`}
                    >
                      <div className="text-left">
                        <p className={`font-semibold font-heading ${selectedPrivacy === option.id ? 'text-primary' : 'text-secondary'}`}>
                          {option.label}
                        </p>
                        <p className="text-sm text-secondary font-body mt-0.5">{option.description}</p>
                      </div>
                      {selectedPrivacy === option.id && (
                        <Check className="w-5 h-5 text-violet-600" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
