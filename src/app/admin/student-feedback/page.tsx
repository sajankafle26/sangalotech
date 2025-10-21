'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StudentTestimonial } from '@/types';

const AdminStudentFeedbackPage: React.FC = () => {
    const [testimonials, setTestimonials] = useState<StudentTestimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/testimonials/students');
            if (!res.ok) throw new Error('Failed to fetch testimonials');
            const data = await res.json();
            setTestimonials(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) {
            return;
        }
        try {
            const res = await fetch(`/api/testimonials/students/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete testimonial');
            }
            fetchTestimonials(); // Refresh list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Student Feedback</h1>
                <Link href="/admin/student-feedback/new" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Add New
                </Link>
            </div>
            {loading && <p>Loading testimonials...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {testimonials.map((item) => (
                                <tr key={item._id?.toString()}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.course}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-sm">{item.review}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/student-feedback/${item._id?.toString()}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                        <button onClick={() => handleDelete(item._id!.toString())} className="text-red-600 hover:text-red-900">Delete</button>
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

export default AdminStudentFeedbackPage;