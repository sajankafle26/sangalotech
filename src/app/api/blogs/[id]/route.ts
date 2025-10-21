import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/types';

// GET a single blog post by numeric ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } } // Inline type for params
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const post = await db.collection<BlogPost>('blogs').findOne({ id });

    if (!post) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// PUT a blog post by numeric ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const postData: Partial<BlogPost> = await request.json();
    const { _id, ...updateData } = postData;

    const { db } = await connectToDatabase();
    const result = await db.collection('blogs').updateOne({ id }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// DELETE a blog post by numeric ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('blogs').deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
