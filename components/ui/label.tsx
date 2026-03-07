import { forwardRef, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export const Label = forwardRef<HTMLLabelElement, ComponentPropsWithoutRef<'label'>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium text-text-primary mb-2 block font-body',
        className
      )}
      {...props}
    />
  )
)

Label.displayName = 'Label'
