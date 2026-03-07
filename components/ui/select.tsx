'use client'

import { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'

const selectVariants = cva(
  'flex w-full items-center justify-between rounded-lg border bg-surface px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20',
  {
    variants: {
      variant: {
        default: 'border-border-medium focus:border-primary',
        ghost: 'border-transparent bg-transparent focus:border-primary',
        filled: 'border-transparent bg-surface-elevated focus:border-primary',
      },
      selectSize: {
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
      selectSize: 'default',
      error: false,
    },
  }
)

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  errorMessage?: string
  helperText?: string
  options: { value: string; label: string; disabled?: boolean }[]
  placeholder?: string
  selectSize?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'ghost' | 'filled'
  hasError?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      selectSize,
      hasError,
      label,
      errorMessage,
      helperText,
      options,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-text-primary font-body">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              selectVariants({ variant, selectSize, error: hasError }),
              'pr-10',
              'text-text-primary appearance-none cursor-pointer',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-surface text-text-primary"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
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
Select.displayName = 'Select'

export { Select, selectVariants }
