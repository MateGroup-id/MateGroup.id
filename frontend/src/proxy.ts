import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes yang memerlukan authentication
const protectedRoutes = ['/profile', '/dashboard'];

// Routes yang hanya untuk non-authenticated users
const authRoutes = ['/auth/login', '/auth/register'];

export const proxy = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Redirect ke login jika protected route dan tidak ada token
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect ke dashboard jika auth route dan sudah login
  if (authRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.png (icon file)
     */
    '/((?!api|_next/static|_next/image|icon.png).*)',
  ],
};

