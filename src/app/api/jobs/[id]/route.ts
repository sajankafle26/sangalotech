import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Job } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

// GET a single job by its custom string ID
export async function GET(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const job = await db.collection<Job>('jobs').findOne({ id: params.id });
        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }
        return NextResponse.json(job);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// UPDATE a job by its custom string ID
export async function PUT(request: Request, { params }: PageProps) {
    try {
        const jobData: Partial<Job> = await request.json();
        const { _id, ...updateData } = jobData;

        const { db } = await connectToDatabase();
        const result = await db.collection('jobs').updateOne(
            { id: params.id },
            { $set: updateData }
        );
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Job updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// DELETE a job by its custom string ID
export async function DELETE(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('jobs').deleteOne({ id: params.id });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}