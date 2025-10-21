import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });
  
  // Clear the session cookie by setting an expiry date in the past
  response.cookies.set('session', '', { httpOnly: true, expires: new Date(0), path: '/' });
  
  return response;
}