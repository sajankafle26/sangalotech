import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Partner } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const partners = await db.collection('partners').find({}).toArray();
    return NextResponse.json(partners);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPartner: Partner = await request.json();

    if (!newPartner.name || !newPartner.logoUrl) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('partners').insertOne(newPartner);

    return NextResponse.json({ message: 'Partner created successfully', partnerId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}