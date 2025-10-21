import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Booking } from '@/types';

// GET all bookings
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const bookings = await db.collection('bookings').find({}).sort({ bookedAt: -1 }).toArray();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Bookings API GET Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}


// POST a new booking
export async function POST(request: Request) {
  try {
    const { name, email, phone, course } = await request.json();

    if (!name || !email || !phone || !course || !course.id || !course.title) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const newBooking: Omit<Booking, '_id'> = {
      studentName: name,
      studentEmail: email,
      studentPhone: phone,
      course: {
        id: course.id,
        title: course.title,
      },
      bookedAt: new Date(),
      status: 'pending',
    };

    await db.collection('bookings').insertOne(newBooking);

    return NextResponse.json({ message: 'Booking successful! We will contact you shortly.' }, { status: 201 });

  } catch (error) {
    console.error('Booking API POST Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}