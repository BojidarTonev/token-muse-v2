import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check for authentication header in protected routes
  const authHeader = request.headers.get('x-auth-token');
  const publicKey = request.headers.get('x-public-key');
  
  // Define protected API routes that require authentication
  const isProtectedApiRoute = request.nextUrl.pathname.startsWith('/api/') && 
    !request.nextUrl.pathname.startsWith('/api/auth');
  
  // If it's a protected route and no auth header is present, return 401
  if (isProtectedApiRoute && (!authHeader || !publicKey)) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only for API routes
export const config = {
  matcher: '/api/:path*',
}; 