import { auth } from "@/lib/auth"
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role
  const { nextUrl } = req
  
  // 1. Atur Content-Security-Policy (CSP) dengan Nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  const isAuthRoute = nextUrl.pathname === "/login"
  
  // 2. JIKA SUDAH LOGIN TAPI MEMBUKA /login
  // Semua role (Admin/User) langsung dilempar ke halaman utama (/)
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // 3. PROTEKSI RUTE ADMIN
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")
  
  if (isAdminRoute) {
    if (!isLoggedIn) {
      // Belum login, suruh login dulu
      return NextResponse.redirect(new URL(`/login?callbackUrl=${nextUrl.pathname}`, nextUrl))
    }
    if (userRole !== "ADMIN") {
      // Sudah login tapi bukan admin, tendang ke /
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }

  // 4. PROTEKSI RUTE USER / EDITOR GOSOKBG
  // Sesuaikan rute ini dengan folder yang ada di app/ kamu
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