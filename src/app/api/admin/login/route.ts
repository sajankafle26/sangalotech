import { NextResponse } from 'next/server';
import { signJwt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Mock authentication: In a real app, validate against a database.
    if (email === 'admin@sangalotech.com' && password === 'password') {
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
      const token = await signJwt({ email, expires });

      const response = NextResponse.json({ message: 'Login successful' });
      
      response.cookies.set('session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          expires,
          sameSite: 'strict',
          path: '/'
      });

      return response;
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}