'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PortfolioItem } from '@/types';
import ImageUpload from './ImageUpload';

interface PortfolioFormProps {
    initialData: Partial<PortfolioItem>;
    isEditing?: boolean;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ initialData, isEditing = false }) => {
    const [item, setItem] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isEditing ? `/api/portfolio/${item.id}` : '/api/portfolio';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} item`);
            }
            router.push('/admin/portfolio');
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
                <label htmlFor="id" className={labelClass}>Item ID (Unique Slug)</label>
                <input type="text" name="id" id="id" value={item.id} onChange={handleChange} required disabled={isEditing} className={`${inputClass} disabled:bg-gray-100`} />
            </div>

            <div>
                <label htmlFor="title" className={labelClass}>Title</label>
                <input type="text" name="title" id="title" value={item.title} onChange={handleChange} required className={inputClass} />
            </div>
            
            <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                <input type="text" name="category" id="category" value={item.category} onChange={handleChange} required className={inputClass} placeholder="e.g., Web Development, Mobile App" />
            </div>

            <div>
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea name="description" id="description" value={item.description} onChange={handleChange} rows={4} required className={inputClass} />
            </div>

            <div>
                 <ImageUpload 
                    label="Project Image"
                    value={item.imageUrl || ''}
                    onChange={(url) => setItem(prev => ({...prev, imageUrl: url}))}
                />
            </div>
            
            <div>
                <label htmlFor="liveUrl" className={labelClass}>Live Project URL (Optional)</label>
                <input type="text" name="liveUrl" id="liveUrl" value={item.liveUrl} onChange={handleChange} className={inputClass} />
            </div>

            {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isEditing ? 'Update Item' : 'Create Item')}
                </button>
            </div>
        </form>
    );
};

export default PortfolioForm;