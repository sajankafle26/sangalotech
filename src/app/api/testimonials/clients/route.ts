import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ClientTestimonial } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const testimonials = await db.collection('client_testimonials').find({}).toArray();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const testimonialData: Omit<ClientTestimonial, '_id'> = await request.json();
    if (!testimonialData.name || !testimonialData.review) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const result = await db.collection('client_testimonials').insertOne(testimonialData);
    return NextResponse.json({ message: 'Testimonial created successfully', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}