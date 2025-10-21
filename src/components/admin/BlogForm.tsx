'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { BlogPost } from '@/types';
import ImageUpload from './ImageUpload';

interface BlogFormProps {
    initialData: Partial<BlogPost>;
    isEditing?: boolean;
}

type BlogFormData = Omit<Partial<BlogPost>, 'tags'> & {
    tags: string;
};

const BlogForm: React.FC<BlogFormProps> = ({ initialData, isEditing = false }) => {
    const [post, setPost] = useState<BlogFormData>({
        ...initialData,
        tags: initialData.tags?.join(', ') || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isEditing ? `/api/blogs/${post.id}` : '/api/blogs';
        const method = isEditing ? 'PUT' : 'POST';

        // Prepare data for submission
        const submissionData = {
            ...post,
            tags: post.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        };

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} post`);
            }
            router.push('/admin/blogs');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500";
    const labelClass = "block text-sm font-medium text-gray-700";

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
                <label htmlFor="title" className={labelClass}>Title</label>
                <input type="text" name="title" id="title" value={post.title} onChange={handleChange} required className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="authorName" className={labelClass}>Author Name</label>
                    <input type="text" name="authorName" id="authorName" value={post.authorName} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                    <label htmlFor="date" className={labelClass}>Date</label>
                    <input type="date" name="date" id="date" value={post.date?.substring(0, 10)} onChange={handleChange} required className={inputClass} />
                </div>
            </div>

            <div>
                <label htmlFor="description" className={labelClass}>Short Description (for card view)</label>
                <textarea name="description" id="description" value={post.description} onChange={handleChange} rows={3} required className={inputClass} />
            </div>

            <div>
                <label htmlFor="content" className={labelClass}>Full Content (HTML allowed)</label>
                <textarea name="content" id="content" value={post.content} onChange={handleChange} rows={10} required className={inputClass} />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <ImageUpload 
                        label="Post Image"
                        value={post.imageUrl || ''}
                        onChange={(url) => setPost(prev => ({...prev, imageUrl: url}))}
                    />
                </div>
                 <div>
                    <ImageUpload 
                        label="Author Image"
                        value={post.authorImageUrl || ''}
                        onChange={(url) => setPost(prev => ({...prev, authorImageUrl: url}))}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="tags" className={labelClass}>Tags (comma-separated)</label>
                <input type="text" name="tags" id="tags" value={post.tags} onChange={handleChange} className={inputClass} placeholder="e.g., Coding, Beginners, Career"/>
            </div>

            {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isEditing ? 'Update Post' : 'Create Post')}
                </button>
            </div>
        </form>
    );
};

export default BlogForm;
