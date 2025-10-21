'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';
import { BlogPost } from '@/types';

const EditBlogPage: React.FC = () => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/blogs/${id}`);
                if (!res.ok) {
                    throw new Error('Blog post not found');
                }
                const data = await res.json();
                setPost(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load blog post data');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Loading post details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog Post</h1>
            {post ? <BlogForm initialData={post} isEditing /> : <p>Post data could not be loaded.</p>}
        </div>
    );
};

export default EditBlogPage;