import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { PortfolioItem } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const portfolioItems = await db.collection('portfolio_items').find({}).toArray();
    return NextResponse.json(portfolioItems);
  } catch (error)
  {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newItemData: PortfolioItem = await request.json();

    if (!newItemData.id || !newItemData.title || !newItemData.category) {
        return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const existingItem = await db.collection('portfolio_items').findOne({ id: newItemData.id });
    if (existingItem) {
        return NextResponse.json({ message: 'A portfolio item with this ID already exists.' }, { status: 409 });
    }

    const result = await db.collection('portfolio_items').insertOne(newItemData);

    return NextResponse.json({ message: 'Portfolio item created successfully', itemId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}