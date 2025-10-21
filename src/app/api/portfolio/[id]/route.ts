import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { PortfolioItem } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

// GET a single portfolio item by its custom string ID
export async function GET(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const item = await db.collection<PortfolioItem>('portfolio_items').findOne({ id: params.id });

        if (!item) {
            return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
        }

        return NextResponse.json(item);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// UPDATE a portfolio item by its custom string ID
export async function PUT(request: Request, { params }: PageProps) {
    try {
        const itemData: Partial<PortfolioItem> = await request.json();
        const { _id, ...updateData } = itemData; // Exclude _id from update

        const { db } = await connectToDatabase();
        const result = await db.collection('portfolio_items').updateOne(
            { id: params.id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Portfolio item updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// DELETE a portfolio item by its custom string ID
export async function DELETE(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('portfolio_items').deleteOne({ id: params.id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Portfolio item deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}