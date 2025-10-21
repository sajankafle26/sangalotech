import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Course } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const { db } = await connectToDatabase();

    const query = category ? { category } : {};
    
    let cursor = db.collection('courses').find(query).sort({ _id: -1 });

    if(limit) {
        cursor = cursor.limit(parseInt(limit));
    }
    
    const courses = await cursor.toArray();

    return NextResponse.json(courses);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newCourse: Course = await request.json();

    if (!newCourse.title || !newCourse.id) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Check if a course with the same custom id already exists
    const existingCourse = await db.collection('courses').findOne({ id: newCourse.id });
    if(existingCourse) {
        return NextResponse.json({ message: 'A course with this ID already exists.' }, { status: 409 });
    }

    const result = await db.collection('courses').insertOne(newCourse);

    return NextResponse.json({ message: 'Course created successfully', courseId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}