import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookie = getCookie('token', { cookies })

  // Redirect to sign in page if not logged in and trying to access dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard') && !cookie) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Redirect to dashboard if already logged in and trying to access sign in or sign up page
  if (
    (request.nextUrl.pathname.startsWith('/signin') ||
      request.nextUrl.pathname.startsWith('/signup')) &&
    cookie
  ) {
    return NextResponse.redirect(
      new URL(`/dashboard/`, request.url)
    )
  }

  return NextResponse.next()
}