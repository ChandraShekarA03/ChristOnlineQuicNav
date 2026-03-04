'use client'

import { forwardRef, HTMLAttributes } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl'
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium overflow-hidden',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image 
            src={src} 
            alt={alt || ''} 
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="select-none">
            {fallback || '?'}
          </span>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar }