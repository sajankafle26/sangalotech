'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
    initialData: Partial<Product>;
    isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, isEditing = false }) => {
    const [item, setItem] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isEditing ? `/api/products/${item.id}` : '/api/products';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} product`);
            }
            router.push('/admin/products');
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
                <label htmlFor="id" className={labelClass}>Product ID (Unique)</label>
                <select name="id" id="id" value={item.id} onChange={handleChange} required disabled={isEditing} className={`${inputClass} disabled:bg-gray-100`}>
                    <option value="">Select ID</option>
                    <option value="school">school</option>
                    <option value="news">news</option>
                    <option value="clinic">clinic</option>
                </select>
            </div>

            <div>
                <label htmlFor="title" className={labelClass}>Title</label>
                <input type="text" name="title" id="title" value={item.title} onChange={handleChange} required className={inputClass} />
            </div>

            <div>
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea name="description" id="description" value={item.description} onChange={handleChange} rows={4} required className={inputClass} />
            </div>

            <div>
                <ImageUpload
                    label="Product Image"
                    value={item.imageUrl || ''}
                    onChange={(url) => setItem(prev => ({...prev, imageUrl: url}))}
                />
            </div>

            {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isEditing ? 'Update Product' : 'Create Product')}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;