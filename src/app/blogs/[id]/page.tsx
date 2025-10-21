import { notFound } from 'next/navigation';
import BlogDetail from '@/components/BlogDetail';
import { connectToDatabase } from '@/lib/mongodb';
import type { BlogPost } from '@/types';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blogPost = await getBlogPost(params.id);
  if (!blogPost) {
    return {
      title: 'Blog Post Not Found'
    }
  }
  return {
    title: `${blogPost.title} | Sangalo Tech Blog`,
    description: blogPost.description,
  }
}

export async function generateStaticParams() {
  const { db } = await connectToDatabase();
  const posts = await db.collection<BlogPost>('blogs').find({}, { projection: { id: 1 } }).toArray();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const { db } = await connectToDatabase();
  const post = await db.collection<BlogPost>('blogs').findOne({ id: parseInt(id) });
  return post;
};

const getRecentPosts = async (currentPostId: number): Promise<BlogPost[]> => {
    const { db } = await connectToDatabase();
    const posts = await db.collection<BlogPost>('blogs').find({ id: { $ne: currentPostId } }).sort({ date: -1 }).limit(3).toArray();
    return posts;
}

const BlogPage = async ({ params }: PageProps) => {
  const blogPost = await getBlogPost(params.id);

  if (!blogPost) {
    notFound();
  }

  const recentPosts = await getRecentPosts(blogPost.id);

  return <BlogDetail blogPost={JSON.parse(JSON.stringify(blogPost))} recentPosts={JSON.parse(JSON.stringify(recentPosts))} />;
};

export default BlogPage;