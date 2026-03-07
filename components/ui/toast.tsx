'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  description?: string
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, description?: string) => void
  success: (message: string, description?: string) => void
  error: (message: string, description?: string) => void
  warning: (message: string, description?: string) => void
  info: (message: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType, description?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { id, message, type, description }
    
    setToasts((prev) => [...prev, newToast])
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }, [])

  const success = useCallback((message: string, description?: string) => {
    showToast(message, 'success', description)
  }, [showToast])

  const error = useCallback((message: string, description?: string) => {
    showToast(message, 'error', description)
  }, [showToast])

  const warning = useCallback((message: string, description?: string) => {
    showToast(message, 'warning', description)
  }, [showToast])

  const info = useCallback((message: string, description?: string) => {
    showToast(message, 'info', description)
  }, [showToast])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
            index={index}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

interface ToastItemProps {
  toast: Toast
  onClose: () => void
  index: number
}

function ToastItem({ toast, onClose, index }: ToastItemProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: 'bg-success-50 dark:bg-success-900/20 border-success-500 text-success-700 dark:text-success-300',
    error: 'bg-danger-50 dark:bg-danger-900/20 border-danger-500 text-danger-700 dark:text-danger-300',
    warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-500 text-warning-700 dark:text-warning-300',
    info: 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-300',
  }

  const iconColors = {
    success: 'text-success-500',
    error: 'text-danger-500',
    warning: 'text-warning-500',
    info: 'text-primary-500',
  }

  const Icon = icons[toast.type]

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg backdrop-blur-sm animate-slide-up',
        colors[toast.type]
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColors[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{toast.message}</p>
        {toast.description && (
          <p className="text-xs mt-1 opacity-80">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
