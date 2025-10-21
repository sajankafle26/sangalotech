import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessage } from '@/types';
import { ObjectId } from 'mongodb';

interface PageProps {
  params: {
    id: string;
  };
}

// GET a single contact message
export async function GET(request: Request, { params }: PageProps) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const message = await db.collection<ContactMessage>('contact_messages').findOne({ _id: new ObjectId(params.id) });
        if (!message) {
            return NextResponse.json({ message: 'Message not found' }, { status: 404 });
        }
        return NextResponse.json(message);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// UPDATE a contact message (e.g., mark as read)
export async function PUT(request: Request, { params }: PageProps) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const { isRead } = await request.json();
        const { db } = await connectToDatabase();
        const result = await db.collection('contact_messages').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: { isRead } }
        );
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Message not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Message updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// DELETE a contact message
export async function DELETE(request: Request, { params }: PageProps) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const result = await db.collection('contact_messages').deleteOne({ _id: new ObjectId(params.id) });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Message not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}
