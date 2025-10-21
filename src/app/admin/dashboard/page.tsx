'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Course } from '@/types';

const AdminDashboardPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/courses');
            if (!res.ok) throw new Error('Failed to fetch courses');
            const data = await res.json();
            setCourses(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (courseId: string) => {
        if (!confirm('Are you sure you want to delete this course?')) {
            return;
        }

        try {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete course');
            }
            // Refresh courses list
            fetchCourses();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
                <Link href="/admin/courses/new" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Add New Course
                </Link>
            </div>
            
            {loading && <p>Loading courses...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {course.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/courses/${course.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;