import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// ✅ Force runtime rendering so the DB isn’t queried at build
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Blog {
  _id: string;
  title: string;
  slug?: string;
  content: string;
  imageUrl?: string;
  author?: string;
  createdAt?: string;
}

interface BlogPageProps {
  params: { id: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = params;

  try {
    const { db } = await connectToDatabase();

    // Validate and convert ObjectId
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { slug: id };
    const blog = (await db.collection<Blog>('blogs').findOne(query)) as Blog | null;

    if (!blog) {
      notFound();
    }

    return (
      <main className="max-w-3xl mx-auto py-12 px-4">
        <article className="prose lg:prose-xl">
          {blog.imageUrl && (
            <div className="relative w-full h-96 mb-6">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          )}

          <h1 className="text-4xl font-bold text-[#00548B] mb-2">{blog.title}</h1>

          {blog.author && (
            <p className="text-gray-500 text-sm mb-6">
              By {blog.author} {blog.createdAt && `• ${new Date(blog.createdAt).toLocaleDateString()}`}
            </p>
          )}

          <div
            className="prose text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </main>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}
