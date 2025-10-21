'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StudentTestimonialForm from '@/components/admin/StudentTestimonialForm';
import { StudentTestimonial } from '@/types';

const EditStudentTestimonialPage: React.FC = () => {
    const [item, setItem] = useState<StudentTestimonial | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;
        const fetchItem = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/testimonials/students/${id}`);
                if (!res.ok) throw new Error('Testimonial not found');
                const data = await res.json();
                setItem(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    if (loading) return <p>Loading details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Student Testimonial</h1>
            {item ? <StudentTestimonialForm initialData={item} isEditing /> : <p>Data could not be loaded.</p>}
        </div>
    );
};

export default EditStudentTestimonialPage;
