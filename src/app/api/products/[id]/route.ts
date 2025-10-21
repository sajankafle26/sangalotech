import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

// GET a single product by its custom string ID
export async function GET(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const product = await db.collection<Product>('products').findOne({ id: params.id });

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// UPDATE a product by its custom string ID
export async function PUT(request: Request, { params }: PageProps) {
    try {
        const productData: Partial<Product> = await request.json();
        const { _id, ...updateData } = productData; // Exclude _id from the update payload

        const { db } = await connectToDatabase();
        const result = await db.collection('products').updateOne(
            { id: params.id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// DELETE a product by its custom string ID
export async function DELETE(request: Request, { params }: PageProps) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('products').deleteOne({ id: params.id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}