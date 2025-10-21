'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CourseForm from '@/components/admin/CourseForm';
import { Course } from '@/types';

const EditCoursePage: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;

        const fetchCourse = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/courses/${id}`);
                if (!res.ok) {
                    throw new Error('Course not found');
                }
                const data = await res.json();
                setCourse(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load course data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) return <p>Loading course details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Course</h1>
            {course ? <CourseForm initialData={course} isEditing /> : <p>Course data could not be loaded.</p>}
        </div>
    );
};

export default EditCoursePage;