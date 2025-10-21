import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ClientTestimonial } from '@/types';
import { ObjectId } from 'mongodb';

interface PageProps {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: PageProps) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const testimonial = await db.collection<ClientTestimonial>('client_testimonials').findOne({ _id: new ObjectId(params.id) });
        if (!testimonial) {
            return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json(testimonial);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: PageProps) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const testimonialData: Partial<ClientTestimonial> = await request.json();
        const { _id, ...updateData } = testimonialData;

        const { db } = await connectToDatabase();
        const result = await db.collection('client_testimonials').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: updateData }
        );
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: PageProps) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const result = await db.collection('client_testimonials').deleteOne({ _id: new ObjectId(params.id) });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}