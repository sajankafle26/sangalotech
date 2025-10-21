import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/types';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection('blogs').find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPostData: Omit<BlogPost, 'id'> = await request.json();

    if (!newPostData.title || !newPostData.content) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Find the highest existing ID and increment it
    const lastPost = await db.collection('blogs').find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastPost.length > 0 ? lastPost[0].id + 1 : 1;

    const newPost: BlogPost = {
        ...newPostData,
        id: newId,
        date: newPostData.date || new Date().toISOString().split('T')[0], // Default to today's date
    };

    const result = await db.collection('blogs').insertOne(newPost);
    return NextResponse.json({ message: 'Blog post created successfully', postId: result.insertedId, newId }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}