'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';

const AdminBlogsPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/blogs');
            if (!res.ok) throw new Error('Failed to fetch blog posts');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (postId: number) => {
        if (!confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        try {
            const res = await fetch(`/api/blogs/${postId}`, { method: 'DELETE' });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete post');
            }
            fetchPosts(); // Refresh the list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
                <Link href="/admin/blogs/new" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Add New Post
                </Link>
            </div>
            
            {loading && <p>Loading posts...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.authorName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/blogs/${post.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminBlogsPage;