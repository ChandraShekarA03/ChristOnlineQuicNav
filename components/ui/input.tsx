'use client'

import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Eye, EyeOff } from 'lucide-react'

const inputVariants = cva(
  'flex w-full rounded-lg border bg-surface px-3 py-2 text-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border-medium focus:border-primary focus:ring-2 focus:ring-primary/20',
        ghost: 'border-transparent bg-transparent focus:border-primary focus:ring-2 focus:ring-primary/20',
        filled: 'border-transparent bg-surface-elevated focus:border-primary focus:ring-2 focus:ring-primary/20',
      },
      inputSize: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-base',
      },
      error: {
        default: '',
        true: 'border-danger focus:border-danger focus:ring-danger/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
      error: false,
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  errorMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  helperText?: string
  inputSize?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'ghost' | 'filled'
  hasError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      hasError,
      label,
      errorMessage,
      leftIcon,
      rightIcon,
      helperText,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-text-primary font-body">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              inputVariants({ variant, inputSize, error: hasError }),
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10',
              'text-text-primary placeholder:text-text-muted',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {(errorMessage || helperText) && (
          <p className={cn('text-xs font-body', errorMessage ? 'text-danger' : 'text-text-muted')}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
