'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { UpcomingClass, Course } from '@/types';

interface ClassFormProps {
    initialData: Partial<UpcomingClass>;
    isEditing?: boolean;
}

const ClassForm: React.FC<ClassFormProps> = ({ initialData, isEditing = false }) => {
    const [item, setItem] = useState(initialData);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Fetch courses to populate the dropdown
        const fetchCourses = async () => {
            try {
                const res = await fetch('/api/courses');
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                }
            } catch (err) {
                console.error("Failed to fetch courses for dropdown", err);
            }
        };
        fetchCourses();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    };

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const courseId = e.target.value;
        const selectedCourse = courses.find(c => c.id === courseId);
        setItem(prev => ({
            ...prev,
            courseId: courseId,
            courseTitle: selectedCourse ? selectedCourse.title : ''
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isEditing ? `/api/classes/${item.id}` : '/api/classes';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} class`);
            }
            router.push('/admin/classes');
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="id" className={labelClass}>Class ID (Unique)</label>
                    <input type="text" name="id" id="id" value={item.id} onChange={handleChange} required disabled={isEditing} className={`${inputClass} disabled:bg-gray-100`} />
                </div>
                 <div>
                    <label htmlFor="courseId" className={labelClass}>Course</label>
                    <select name="courseId" id="courseId" value={item.courseId} onChange={handleCourseChange} required className={inputClass}>
                        <option value="">Select a course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="courseTitle" className={labelClass}>Course Title (auto-filled)</label>
                    <input type="text" name="courseTitle" id="courseTitle" value={item.courseTitle} readOnly className={`${inputClass} bg-gray-100`} />
                </div>
                <div>
                    <label htmlFor="instructor" className={labelClass}>Instructor</label>
                    <input type="text" name="instructor" id="instructor" value={item.instructor} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                    <label htmlFor="startDate" className={labelClass}>Start Date</label>
                    <input type="text" name="startDate" id="startDate" value={item.startDate} onChange={handleChange} required className={inputClass} placeholder="e.g., September 15, 2025" />
                </div>
                 <div>
                    <label htmlFor="day" className={labelClass}>Day</label>
                    <input type="text" name="day" id="day" value={item.day} onChange={handleChange} required className={inputClass} placeholder="e.g., Sunday"/>
                </div>
                <div>
                    <label htmlFor="time" className={labelClass}>Time</label>
                    <input type="text" name="time" id="time" value={item.time} onChange={handleChange} required className={inputClass} placeholder="e.g., 7:00 AM - 9:00 AM" />
                </div>
            </div>

            {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isEditing ? 'Update Class' : 'Create Class')}
                </button>
            </div>
        </form>
    );
};

export default ClassForm;