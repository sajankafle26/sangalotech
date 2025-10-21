import React from 'react';
import BlogForm from '@/components/admin/BlogForm';
import { BlogPost } from '@/types';

const NewBlogPage: React.FC = () => {
    const initialPostData: Partial<BlogPost> = {
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        imageUrl: '',
        authorName: '',
        authorImageUrl: '',
        tags: [],
        content: '',
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Blog Post</h1>
            <BlogForm initialData={initialPostData} />
        </div>
    );
};

export default NewBlogPage;