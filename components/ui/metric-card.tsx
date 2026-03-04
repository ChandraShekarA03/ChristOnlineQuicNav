'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { Card } from './card'

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: LucideIcon
  iconColor?: string
  loading?: boolean
  trend?: number[]
}

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ 
    className, 
    title, 
    value, 
    change, 
    changeType = 'neutral', 
    icon: Icon, 
    iconColor = 'text-primary-600', 
    loading = false,
    trend,
    ...props 
  }, ref) => {
    return (
      <Card 
        ref={ref}
        className={cn('metric-card', className)}
        hover="glow"
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="metric-label">{title}</p>
            <div className="mt-2">
              {loading ? (
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                <p className="metric-value">{value}</p>
              )}
            </div>
            {change && (
              <p className={cn(
                'metric-change mt-1',
                {
                  'metric-change-positive': changeType === 'positive',
                  'metric-change-negative': changeType === 'negative',
                  'text-gray-500 dark:text-gray-400': changeType === 'neutral',
                }
              )}>
                {change}
              </p>
            )}
          </div>
          {Icon && (
            <div className={cn('p-2 rounded-lg bg-gray-50 dark:bg-gray-800', iconColor)}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        {trend && trend.length > 0 && (
          <div className="mt-4 h-8">
            <svg className="w-full h-full" viewBox={`0 0 ${trend.length * 10} 40`}>
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={cn(
                  changeType === 'positive' ? 'text-success-500' : 
                  changeType === 'negative' ? 'text-danger-500' : 
                  'text-primary-500'
                )}
                points={trend.map((value, index) => `${index * 10},${40 - (value / Math.max(...trend)) * 30}`).join(' ')}
              />
            </svg>
          </div>
        )}
      </Card>
    )
  }
)
MetricCard.displayName = 'MetricCard'

export { MetricCard }