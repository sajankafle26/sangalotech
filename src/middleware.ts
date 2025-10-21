import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/auth';

interface JwtPayload {
    email: string;
    iat: number;
    exp: number;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get('session')?.value;

    const isLoginPage = pathname.startsWith('/admin/login');
    const isAdminPath = pathname.startsWith('/admin') && !isLoginPage;
    
    const payload = sessionToken ? await verifyJwt<JwtPayload>(sessionToken) : null;
    
    // If user is logged in and tries to access login page, redirect to dashboard
    if (payload && isLoginPage) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // If user is not logged in and tries to access a protected admin page
    if (!payload && isAdminPath) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        // Clear any invalid cookie that might exist
        response.cookies.set('session', '', { httpOnly: true, expires: new Date(0), path: '/' });
        return response;
    }
        
    return NextResponse.next();
}

// This middleware applies to all routes under /admin
export const config = {
    matcher: ['/admin/:path*'],
};