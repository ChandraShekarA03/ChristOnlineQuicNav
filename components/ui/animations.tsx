'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ReactNode } from 'react'

// ==================== FADE ANIMATIONS ====================
interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function FadeIn({ children, delay = 0, duration = 0.5, className = '', direction = 'up' }: FadeInProps) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...directions[direction] },
    visible: { opacity: 1, x: 0, y: 0, transition: { delay, duration } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== SCALE ANIMATIONS ====================
interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  from?: number
}

export function ScaleIn({ children, delay = 0, duration = 0.3, className = '', from = 0.9 }: ScaleInProps) {
  const variants: Variants = {
    hidden: { opacity: 0, scale: from },
    visible: { opacity: 1, scale: 1, transition: { delay, duration } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== SLIDE ANIMATIONS ====================
interface SlideInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function SlideIn({ children, delay = 0, duration = 0.4, className = '', direction = 'up' }: SlideInProps) {
  const directions = {
    left: { x: -100 },
    right: { x: 100 },
    up: { y: 100 },
    down: { y: -100 },
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...directions[direction] },
    visible: { opacity: 1, x: 0, y: 0, transition: { delay, duration } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== STAGGER CONTAINER ====================
interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, delay = 0, staggerDelay = 0.1, className = '' }: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// ==================== FLOATING ANIMATION ====================
interface FloatProps {
  children: ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
}

export function Float({ children, delay = 0, duration = 3, yOffset = 15, className = '' }: FloatProps) {
  const variants: Variants = {
    float: {
      y: [0, -yOffset, 0],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      },
    },
  }

  return (
    <motion.div
      animate="float"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== ROTATE ANIMATION ====================
interface RotateProps {
  children: ReactNode
  delay?: number
  duration?: number
  clockwise?: boolean
  className?: string
}

export function Rotate({ children, delay = 0, duration = 20, clockwise = true, className = '' }: RotateProps) {
  const variants: Variants = {
    rotate: {
      rotate: clockwise ? 360 : -360,
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      },
    },
  }

  return (
    <motion.div
      animate="rotate"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== PULSE ANIMATION ====================
interface PulseProps {
  children: ReactNode
  delay?: number
  duration?: number
  scale?: number
  className?: string
}

export function Pulse({ children, delay = 0, duration = 2, scale = 1.05, className = '' }: PulseProps) {
  const variants: Variants = {
    pulse: {
      scale: [1, scale, 1],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    },
  }

  return (
    <motion.div
      animate="pulse"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== BOUNCE ANIMATION ====================
interface BounceProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Bounce({ children, delay = 0, className = '' }: BounceProps) {
  const variants: Variants = {
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      },
    },
  }

  return (
    <motion.div
      animate="bounce"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== TYPING ANIMATION ====================
interface TypingAnimationProps {
  text: string
  delay?: number
  duration?: number
  className?: string
}

export function TypingAnimation({ text, delay = 0, duration = 0.05, className = '' }: TypingAnimationProps) {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: delay + i * duration,
      },
    }),
  }

  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

// ==================== ANIMATED NUMBER ====================
interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedNumber({ value, duration = 2, className = '', prefix = '', suffix = '' }: AnimatedNumberProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {prefix}{value}{suffix}
    </motion.span>
  )
}

// ==================== PAGE TRANSITION ====================
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== HOVER LIFT ====================
interface HoverLiftProps {
  children: ReactNode
  className?: string
  yOffset?: number
}

export function HoverLift({ children, className = '', yOffset = -8 }: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: yOffset, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// ==================== ANIMATE PRESENCE WRAPPER ====================
interface AnimatePresenceWrapperProps {
  children: ReactNode
  isVisible: boolean
  className?: string
}

export function AnimatePresenceWrapper({ children, isVisible, className = '' }: AnimatePresenceWrapperProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ==================== SKELETON LOADING ====================
interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  borderRadius?: string
}

export function Skeleton({ className = '', width = '100%', height = '1rem', borderRadius = '8px' }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gray-200 dark:bg-gray-700 ${className}`}
      style={{ width, height, borderRadius }}
      animate={{
        background: [
          'linear-gradient(90deg, #e0e7ff 0%, #f0f4ff 50%, #e0e7ff 100%)',
          'linear-gradient(90deg, #f0f4ff 0%, #e0e7ff 50%, #f0f4ff 100%)',
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

// ==================== SHIMMER EFFECT ====================
interface ShimmerProps {
  children: ReactNode
  className?: string
}

export function Shimmer({ children, className = '' }: ShimmerProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
      />
    </motion.div>
  )
}

// ==================== ORBIT ANIMATION ====================
interface OrbitProps {
  children: ReactNode
  duration?: number
  radius?: number
  className?: string
}

export function Orbit({ children, duration = 20, radius = 100, className = '' }: OrbitProps) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      {children}
    </motion.div>
  )
}

// ==================== GLITCH EFFECT ====================
interface GlitchProps {
  children: ReactNode
  trigger?: boolean
  className?: string
}

export function Glitch({ children, trigger = false, className = '' }: GlitchProps) {
  const variants: Variants = {
    normal: {
      skewX: 0,
    },
    glitch: {
      skewX: [0, 10, -10, 10, -10, 0],
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <motion.div
      animate={trigger ? 'glitch' : 'normal'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ==================== RIPPLE EFFECT ====================
interface RippleProps {
  children: ReactNode
  className?: string
}

export function Ripple({ children, className = '' }: RippleProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  )
}
