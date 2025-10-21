import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    // In a real app, you might want to add seeding logic if the collection is empty
    const values = await db.collection('company_values').find({}).toArray();
    return NextResponse.json(values);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}