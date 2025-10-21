import Link from 'next/link';
import { connectToDatabase } from '@/lib/mongodb';
import type { BlogPost } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
    title: 'Our Blog | Sangalo Tech',
    description: 'Explore ideas, tips, and trends in coding, tech, and innovation from the experts at Sangalo Tech.',
};

const BlogCard: React.FC<{ post: BlogPost; }> = ({ post }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col">
        <Link href={`/blogs/${post.id}`} className="block relative overflow-hidden aspect-[16/9]">
            <Image 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={post.imageUrl}
                alt={post.title}
                fill
            />
        </Link>
        <div className="p-6 space-y-4 flex flex-col flex-grow">
            <div className="flex items-center text-sm text-gray-500">
                <i className="far fa-calendar-alt h-4 w-4 mr-1"></i>
                {post.date}
            </div>
            <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-grow">
                <Link href={`/blogs/${post.id}`} className="hover:text-red-500 transition-colors">{post.title}</Link>
            </h3>
            <p className="text-gray-600 line-clamp-2">{post.description}</p>
            <div className="pt-2">
                <Link href={`/blogs/${post.id}`} className="inline-flex items-center text-red-500 font-medium group-hover:text-red-600 transition-colors duration-300">
                    Read more
                    <i className="fas fa-arrow-right h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"></i>
                </Link>
            </div>
        </div>
    </div>
);

async function getBlogs() {
    const { db } = await connectToDatabase();
    const posts = await db.collection<BlogPost>('blogs').find({}).sort({ date: -1 }).toArray();
    return posts;
}

const BlogsPage = async () => {
    const posts = await getBlogs();

    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">Home</Link> &gt; <span className="font-medium text-gray-700">Blogs</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-[#00548B] mt-2">Our Blog</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl">Explore ideas, tips, and trends in coding, tech, and innovation.</p>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => <BlogCard key={post.id} post={JSON.parse(JSON.stringify(post))} />)}
                </div>
            </main>
        </div>
    );
};

export default BlogsPage;