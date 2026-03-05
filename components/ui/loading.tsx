'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
}

export function Loading({ size = 'md', className, variant = 'spinner' }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center gap-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-primary-500 animate-bounce',
              size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : size === 'xl' ? 'w-4 h-4' : 'w-2 h-2'
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <div 
          className={cn(
            'rounded-full bg-primary-500 animate-ping',
            sizeClasses[size]
          )} 
        />
      </div>
    )
  }

  if (variant === 'bars') {
    return (
      <div className={cn('flex items-center justify-center gap-1', className)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'w-1 bg-primary-500 rounded-full animate-pulse',
              size === 'sm' ? 'h-3' : size === 'lg' ? 'h-8' : size === 'xl' ? 'h-12' : 'h-5'
            )}
            style={{ 
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className={cn('animate-spin text-primary-600', sizeClasses[size])} />
    </div>
  )
}

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'shimmer' | 'pulse'
}

export function Skeleton({ className, variant = 'shimmer' }: SkeletonProps) {
  const baseClass = 'rounded-md bg-gray-200 dark:bg-gray-700'
  
  if (variant === 'shimmer') {
    return (
      <div 
        className={cn(
          baseClass,
          'relative overflow-hidden',
          className
        )}
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    )
  }
  
  return (
    <div className={cn(baseClass, 'animate-pulse', className)} />
  )
}

// Loading overlay for full-page loading states
export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-surface shadow-2xl animate-scale-in">
        <Loading size="xl" />
        <p className="text-lg font-medium text-primary animate-pulse">{message}</p>
      </div>
    </div>
  )
}

// Card skeleton for loading states
export function CardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-light bg-surface animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </div>
  )
}