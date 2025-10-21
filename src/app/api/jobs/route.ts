import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Job } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const jobs = await db.collection('jobs').find({}).sort({ postedAt: -1 }).toArray();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newJob: Omit<Job, '_id' | 'postedAt'> = await request.json();
    if (!newJob.id || !newJob.title) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const existingJob = await db.collection('jobs').findOne({ id: newJob.id });
    if (existingJob) {
        return NextResponse.json({ message: 'A job with this ID already exists.' }, { status: 409 });
    }
    const result = await db.collection('jobs').insertOne({ ...newJob, postedAt: new Date() });
    return NextResponse.json({ message: 'Job created successfully', jobId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}