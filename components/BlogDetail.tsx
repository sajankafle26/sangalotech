import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import type { BlogPost } from '../types';

// Fix: Removed static data import and updated component to accept recentPosts as a prop.
const BlogDetail: React.FC<{ blogPost: BlogPost; recentPosts: BlogPost[] }> = ({ blogPost, recentPosts }) => {
    return (
        <div className="bg-white">
            <header className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">Home</Link> &gt; <Link href="/blogs" className="text-[#00548B] hover:underline focus:outline-none">Blogs</Link> &gt; <span className="font-medium text-gray-700 truncate w-64 inline-block">{blogPost.title}</span>
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-2 space-y-8">
                        <Image src="/fallback.jpg" alt="image" width={800} height={450} />

                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold text-gray-900">{blogPost.title}</h1>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Image src="/fallback.jpg" alt="image" width={800} height={450} />
                                    <span>{blogPost.authorName}</span>
                                </div>
                                <span>&bull;</span>
                                <div><i className="far fa-calendar-alt mr-1.5"></i>{blogPost.date}</div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {blogPost.tags.map(tag => (
                                    <span key={tag} className="bg-blue-100 text-[#00548B] text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                        
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-bold mb-3">Share this post</h3>
                            <div className="flex items-center gap-4">
                                <a href="#" className="text-gray-500 hover:text-blue-600"><i className="fab fa-facebook-f text-xl"></i></a>
                                <a href="#" className="text-gray-500 hover:text-blue-400"><i className="fab fa-twitter text-xl"></i></a>
                                <a href="#" className="text-gray-500 hover:text-blue-700"><i className="fab fa-linkedin-in text-xl"></i></a>
                                <a href="#" className="text-gray-500 hover:text-green-500"><i className="fab fa-whatsapp text-xl"></i></a>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="mt-12 lg:mt-0">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                                <ul className="space-y-4">
                                    {recentPosts.map(post => (
                                        <li key={post.id}>
                                            <Link href={`/blogs/${post.id}`} className="font-semibold text-gray-800 hover:text-[#00548B] line-clamp-2">{post.title}</Link>
                                            <p className="text-sm text-gray-500">{post.date}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default BlogDetail;
