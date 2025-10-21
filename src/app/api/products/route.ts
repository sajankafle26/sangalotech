import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const newProduct: Product = await request.json();

        if (!newProduct.id || !newProduct.title) {
            return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const existingProduct = await db.collection('products').findOne({ id: newProduct.id });
        if (existingProduct) {
            return NextResponse.json({ message: 'A product with this ID already exists.' }, { status: 409 });
        }

        const result = await db.collection('products').insertOne(newProduct);
        return NextResponse.json({ message: 'Product created successfully', productId: result.insertedId }, { status: 201 });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}