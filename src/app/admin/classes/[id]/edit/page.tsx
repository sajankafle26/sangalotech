'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ClassForm from '@/components/admin/ClassForm';
import { UpcomingClass } from '@/types';

const EditClassPage: React.FC = () => {
    const [item, setItem] = useState<UpcomingClass | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;
        const fetchItem = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/classes/${id}`);
                if (!res.ok) throw new Error('Class not found');
                const data = await res.json();
                setItem(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load class data');
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    if (loading) return <p>Loading class details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Class</h1>
            {item ? <ClassForm initialData={item} isEditing /> : <p>Class data could not be loaded.</p>}
        </div>
    );
};

export default EditClassPage;