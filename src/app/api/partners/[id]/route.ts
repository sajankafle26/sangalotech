import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface PageProps {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: PageProps) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const result = await db.collection('partners').deleteOne({ _id: new ObjectId(params.id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}