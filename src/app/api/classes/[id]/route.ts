import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { UpcomingClass } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const item = await db.collection<UpcomingClass>('upcoming_classes').findOne({ id: params.id });
        if (!item) {
            return NextResponse.json({ message: 'Class not found' }, { status: 404 });
        }
        return NextResponse.json(item);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: PageProps) {
    try {
        const itemData: Partial<UpcomingClass> = await request.json();
        const { _id, ...updateData } = itemData;
        const { db } = await connectToDatabase();
        const result = await db.collection('upcoming_classes').updateOne({ id: params.id }, { $set: updateData });
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Class not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Class updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('upcoming_classes').deleteOne({ id: params.id });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Class not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}