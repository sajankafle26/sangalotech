import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({ success: true, url: dataUrl });

  } catch (error) {
    console.error('Error processing file upload:', error);
    return NextResponse.json({ success: false, message: 'Failed to process file.' }, { status: 500 });
  }
}
