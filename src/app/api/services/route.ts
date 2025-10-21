import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { TechService } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const services = await db.collection('tech_services').find({}).toArray();
    return NextResponse.json(services);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const newService: TechService = await request.json();

        if (!newService.id || !newService.title) {
            return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const existingService = await db.collection('tech_services').findOne({ id: newService.id });
        if (existingService) {
            return NextResponse.json({ message: 'A service with this ID already exists.' }, { status: 409 });
        }

        const result = await db.collection('tech_services').insertOne(newService);
        return NextResponse.json({ message: 'Service created successfully', serviceId: result.insertedId }, { status: 201 });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}