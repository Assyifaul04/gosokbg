import { auth } from "@/lib/auth"
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role
  const { nextUrl } = req
  
  // 1. Atur Content-Security-Policy (CSP) yang lebih kompatibel dengan Next.js & pihak ketiga
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:;
    style-src 'self' 'unsafe-inline' https:;
    img-src 'self' blob: data: https:;
    font-src 'self' data: https:;
    connect-src 'self' https: http: wss:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  const isAuthRoute = nextUrl.pathname === "/login"
  
  // 2. JIKA SUDAH LOGIN TAPI MEMBUKA /login
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // 3. PROTEKSI RUTE ADMIN
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")
  
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${nextUrl.pathname}`, nextUrl))
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }

  // 4. PROTEKSI RUTE USER
  const isProtectedRoute = nextUrl.pathname.startsWith("/editor") || nextUrl.pathname.startsWith("/dashboard")
  
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${nextUrl.pathname}`, nextUrl))
  }

  // 5. Buat Response
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('Content-Security-Policy', cspHeader)

  // 6. Cegah Cache (Back Button Issue)
  if (isAdminRoute || isProtectedRoute || isAuthRoute) {
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  }

  return response
})

export const config = {
  matcher: [
    /*
     * Terapkan ke semua rute KECUALI file statis Next.js
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}