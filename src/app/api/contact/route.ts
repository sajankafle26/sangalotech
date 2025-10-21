import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessage } from '@/types';

// GET all contact messages
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const messages = await db.collection('contact_messages').find({}).sort({ receivedAt: -1 }).toArray();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Contact API GET Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// POST a new contact message
export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const newContactMessage: Omit<ContactMessage, '_id'> = {
      name,
      email,
      phone,
      subject,
      message,
      isRead: false,
      receivedAt: new Date(),
    };

    await db.collection('contact_messages').insertOne(newContactMessage);

    // In a real app, you might send an email notification here
    
    return NextResponse.json({ message: 'Thank you for your message! We will get back to you shortly.' }, { status: 201 });

  } catch (error) {
    console.error('Contact API POST Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
