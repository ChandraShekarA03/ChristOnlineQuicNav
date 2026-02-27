import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn('glass-panel p-6 rounded-2xl', className)}
      {...props}
    />
  )
}