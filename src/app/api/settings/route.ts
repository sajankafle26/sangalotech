import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getSiteSettings } from '@/lib/data';

// GET the current site settings
export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings API GET Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// UPDATE the site settings
export async function PUT(request: Request) {
  try {
    const settingsData = await request.json();
    const { _id, ...updateData } = settingsData;

    const { db } = await connectToDatabase();
    
    await db.collection('settings').updateOne(
      {}, // Find the single settings document
      { $set: updateData },
      { upsert: true } // Create it if it doesn't exist
    );

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Settings API PUT Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}