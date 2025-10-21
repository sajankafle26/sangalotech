'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { TechService } from '@/types';
import ImageUpload from './ImageUpload';

interface ServiceFormProps {
    initialData: Partial<TechService>;
    isEditing?: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, isEditing = false }) => {
    const [item, setItem] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...(item.features || [])];
        newFeatures[index] = value;
        setItem(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setItem(prev => ({ ...prev, features: [...(prev.features || []), ''] }));
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...(item.features || [])];
        newFeatures.splice(index, 1);
        setItem(prev => ({ ...prev, features: newFeatures }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isEditing ? `/api/services/${item.id}` : '/api/services';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} service`);
            }
            router.push('/admin/services');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const inputClass = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500";
    const labelClass = "block text-sm font-medium text-gray-700";
    const smallButtonClass = "px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600";

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="id" className={labelClass}>Service ID (Unique Slug)</label>
                    <input type="text" name="id" id="id" value={item.id} onChange={handleChange} required disabled={isEditing} className={`${inputClass} disabled:bg-gray-100`} />
                </div>
                 <div>
                    <label htmlFor="title" className={labelClass}>Title</label>
                    <input type="text" name="title" id="title" value={item.title} onChange={handleChange} required className={inputClass} />
                </div>
            </div>
             <div>
                <label htmlFor="description" className={labelClass}>Short Description</label>
                <textarea name="description" id="description" value={item.description} onChange={handleChange} rows={3} className={inputClass} />
            </div>
             <div>
                <label htmlFor="longDescription" className={labelClass}>Long Description</label>
                <textarea name="longDescription" id="longDescription" value={item.longDescription} onChange={handleChange} rows={5} className={inputClass} />
            </div>
             <div>
                <ImageUpload 
                    label="Service Image"
                    value={item.imageUrl || ''}
                    onChange={(url) => setItem(prev => ({...prev, imageUrl: url}))}
                />
            </div>
            
            <fieldset className="p-4 border rounded-md space-y-4">
                <legend className="text-lg font-semibold text-gray-800 px-2">Features</legend>
                {item.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className={`${inputClass} w-full`} />
                        <button type="button" onClick={() => removeFeature(index)} className={smallButtonClass}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addFeature} className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Add Feature</button>
            </fieldset>

            {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isEditing ? 'Update Service' : 'Create Service')}
                </button>
            </div>
        </form>
    );
};

export default ServiceForm;