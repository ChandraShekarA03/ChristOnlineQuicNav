'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
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
  animationDelay?: number
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
    animationDelay = 0,
    ...props 
  }, ref) => {
    return (
      <Card 
        ref={ref}
        className={cn(
          'metric-card group relative overflow-hidden',
          'hover:border-primary-300 dark:hover:border-primary-700',
          className
        )}
        hover="all"
        style={{ 
          animationDelay: `${animationDelay}ms`,
          opacity: 0,
          animation: `fadeInUp 0.5s ease-out ${animationDelay}ms forwards`
        }}
        {...props}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/10 transition-all duration-500 rounded-xl" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <p className="metric-label text-sm font-medium text-secondary mb-1">{title}</p>
            <div className="mt-2">
              {loading ? (
                <div className="h-8 w-24 shimmer rounded" />
              ) : (
                <p className="metric-value text-3xl font-bold text-primary tracking-tight">
                  {value}
                </p>
              )}
            </div>
            {change && (
              <div className={cn(
                'mt-2 flex items-center gap-1 text-sm font-medium',
                {
                  'text-success-600': changeType === 'positive',
                  'text-danger-600': changeType === 'negative',
                  'text-secondary': changeType === 'neutral',
                }
              )}>
                {changeType === 'positive' && <TrendingUp className="w-4 h-4" />}
                {changeType === 'negative' && <TrendingDown className="w-4 h-4" />}
                <span>{change}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn(
              'icon-container p-3 rounded-xl transition-all duration-300',
              'bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20',
              'group-hover:scale-110 group-hover:rotate-3',
              iconColor
            )}>
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>
        {trend && trend.length > 0 && (
          <div className="mt-4 h-12 relative">
            <svg className="w-full h-full" viewBox={`0 0 ${(trend.length - 1) * 15} 48`} preserveAspectRatio="none">
              {/* Gradient fill under the line */}
              <defs>
                <linearGradient id={`gradient-${changeType}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={changeType === 'positive' ? '#22c55e' : changeType === 'negative' ? '#ef4444' : '#7C83FF'} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={changeType === 'positive' ? '#22c55e' : changeType === 'negative' ? '#ef4444' : '#7C83FF'} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#gradient-${changeType})`}
                d={`M0,48 ${trend.map((val, idx) => `L${idx * 15},${48 - (val / Math.max(...trend)) * 40}`).join(' ')} L${(trend.length - 1) * 15},48 Z`}
              />
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  'transition-all duration-500',
                  changeType === 'positive' ? 'text-success-500' : 
                  changeType === 'negative' ? 'text-danger-500' : 
                  'text-primary-500'
                )}
                points={trend.map((value, index) => `${index * 15},${48 - (value / Math.max(...trend)) * 40}`).join(' ')}
              />
              {/* Animated dot at the end */}
              <circle
                cx={(trend.length - 1) * 15}
                cy={48 - (trend[trend.length - 1] / Math.max(...trend)) * 40}
                r="4"
                className={cn(
                  'animate-pulse',
                  changeType === 'positive' ? 'fill-success-500' : 
                  changeType === 'negative' ? 'fill-danger-500' : 
                  'fill-primary-500'
                )}
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