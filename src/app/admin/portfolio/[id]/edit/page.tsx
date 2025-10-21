'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PortfolioForm from '@/components/admin/PortfolioForm';
import { PortfolioItem } from '@/types';

const EditPortfolioItemPage: React.FC = () => {
    const [item, setItem] = useState<PortfolioItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;

        const fetchItem = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/portfolio/${id}`);
                if (!res.ok) {
                    throw new Error('Portfolio item not found');
                }
                const data = await res.json();
                setItem(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load portfolio item data');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) return <p>Loading portfolio item details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Portfolio Item</h1>
            {item ? <PortfolioForm initialData={item} isEditing /> : <p>Item data could not be loaded.</p>}
        </div>
    );
};

export default EditPortfolioItemPage;