import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'students' or 'clients'
    const { db } = await connectToDatabase();

    let testimonials = [];
    if (type === 'students') {
      testimonials = await db.collection('student_testimonials').find({}).toArray();
    } else if (type === 'clients') {
      testimonials = await db.collection('client_testimonials').find({}).toArray();
    } else {
       return NextResponse.json({ message: 'Invalid testimonial type specified.' }, { status: 400 });
    }

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}