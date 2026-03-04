import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  )
}