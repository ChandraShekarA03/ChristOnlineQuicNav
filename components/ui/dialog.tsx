'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const dialogVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange?.(false)}
      />
      
      {/* Dialog Content */}
      <div className={dialogVariants()}>
        <div
          className="relative z-50 w-full max-w-lg mx-4 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-white/20 bg-background p-6 shadow-2xl',
        'dark:bg-surface dark:border-white/10',
        className
      )}
      {...props}
    />
  )
)
DialogContent.displayName = 'DialogContent'

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-2 text-center sm:text-left mb-4', className)}
      {...props}
    />
  )
)
DialogHeader.displayName = 'DialogHeader'

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-2xl font-bold font-heading',
        'text-text-primary',
        className
      )}
      {...props}
    />
  )
)
DialogTitle.displayName = 'DialogTitle'

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary font-body', className)}
      {...props}
    />
  )
)
DialogDescription.displayName = 'DialogDescription'

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6', className)}
      {...props}
    />
  )
)
DialogFooter.displayName = 'DialogFooter'

export {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
}
