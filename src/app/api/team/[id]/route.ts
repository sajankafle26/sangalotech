import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { TeamMember } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const member = await db.collection<TeamMember>('team_members').findOne({ id: params.id });
        if (!member) {
            return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json(member);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: PageProps) {
    try {
        const memberData: Partial<TeamMember> = await request.json();
        const { _id, ...updateData } = memberData;

        const { db } = await connectToDatabase();
        const result = await db.collection('team_members').updateOne(
            { id: params.id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Team member updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('team_members').deleteOne({ id: params.id });
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}