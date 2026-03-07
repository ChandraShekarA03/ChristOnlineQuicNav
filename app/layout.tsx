import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'
import { AuthProvider } from '@/lib/auth-context'

export const metadata: Metadata = {
  title: 'Christ Faculty Hub - Electric Lavender Theme',
  description: 'Modern university faculty portal with Electric Lavender and Midnight Indigo design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}