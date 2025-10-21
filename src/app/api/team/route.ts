import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { TeamMember } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const teamMembers = await db.collection('team_members').find({}).toArray();
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMember: TeamMember = await request.json();
    if (!newMember.id || !newMember.name) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const existingMember = await db.collection('team_members').findOne({ id: newMember.id });
    if (existingMember) {
        return NextResponse.json({ message: 'A team member with this ID already exists.' }, { status: 409 });
    }
    const result = await db.collection('team_members').insertOne(newMember);
    return NextResponse.json({ message: 'Team member created successfully', memberId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}