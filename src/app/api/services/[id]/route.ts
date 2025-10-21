import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import type { TechService } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const service = await db.collection<TechService>('tech_services').findOne({ id: params.id });
        if (!service) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json(service);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: PageProps) {
    try {
        const itemData: Partial<TechService> = await request.json();
        const { _id, ...updateData } = itemData;
        const { db } = await connectToDatabase();
        const result = await db.collection('tech_services').updateOne({ id: params.id }, { $set: updateData });
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Service updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('tech_services').deleteOne({ id: params.id });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}