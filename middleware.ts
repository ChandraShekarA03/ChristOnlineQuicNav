import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for Firebase auth token in cookies
  const token = request.cookies.get('auth-token')?.value
  const hasAuthCookie = token || request.cookies.get('firebase-auth-token')?.value

  // Protected routes - require authentication
  const protectedRoutes = ['/dashboard']
  
  // Auth routes - redirect if already authenticated
  const authRoutes = ['/auth/signin']

  // Check if trying to access protected route without auth
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!hasAuthCookie) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  // Check if trying to access auth route while already authenticated
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (hasAuthCookie) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}
