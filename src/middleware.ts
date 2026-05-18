import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from './lib/auth'

export async function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/admin/login');
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')?.value;
    
    if (!session && !isAuthPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    if (session) {
      const parsed = await decrypt(session);
      if (!parsed && !isAuthPage) {
         return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      if (parsed && isAuthPage) {
         return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}
