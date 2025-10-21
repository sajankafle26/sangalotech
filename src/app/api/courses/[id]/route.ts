import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Course } from '@/types';
import { ObjectId } from 'mongodb';

interface PageProps {
  params: {
    id: string;
  };
}

// GET a single course by its custom string ID
export async function GET(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const course = await db.collection<Course>('courses').findOne({ id: params.id });

        if (!course) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// UPDATE a course by its custom string ID
export async function PUT(request: Request, { params }: PageProps) {
    try {
        const courseData: Partial<Course> = await request.json();
        const { _id, ...updateData } = courseData; // Exclude _id from the update payload

        const { db } = await connectToDatabase();
        const result = await db.collection('courses').updateOne(
            { id: params.id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// DELETE a course by its custom string ID
export async function DELETE(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('courses').deleteOne({ id: params.id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}