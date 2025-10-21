'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/types';

const EditProductPage: React.FC = () => {
    const [item, setItem] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;

        const fetchItem = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                const data = await res.json();
                setItem(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load product data');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>
            {item ? <ProductForm initialData={item} isEditing /> : <p>Product data could not be loaded.</p>}
        </div>
    );
};

export default EditProductPage;