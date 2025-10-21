import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { UpcomingClass } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const classes = await db.collection('upcoming_classes').find({}).sort({ startDate: 1 }).toArray();
    return NextResponse.json(classes);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newClass: UpcomingClass = await request.json();
    if (!newClass.id || !newClass.courseTitle) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const existingClass = await db.collection('upcoming_classes').findOne({ id: newClass.id });
    if (existingClass) {
        return NextResponse.json({ message: 'A class with this ID already exists.' }, { status: 409 });
    }
    const result = await db.collection('upcoming_classes').insertOne(newClass);
    return NextResponse.json({ message: 'Class created successfully', classId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}