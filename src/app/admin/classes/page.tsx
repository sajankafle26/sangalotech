'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UpcomingClass } from '@/types';

const AdminClassesPage: React.FC = () => {
    const [classes, setClasses] = useState<UpcomingClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/classes');
            if (!res.ok) throw new Error('Failed to fetch classes');
            const data = await res.json();
            setClasses(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleDelete = async (classId: string) => {
        if (!confirm('Are you sure you want to delete this class?')) {
            return;
        }
        try {
            const res = await fetch(`/api/classes/${classId}`, { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete class');
            }
            fetchClasses(); // Refresh
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Upcoming Classes</h1>
                <Link href="/admin/classes/new" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Add New Class
                </Link>
            </div>
            {loading && <p>Loading classes...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {classes.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.courseTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.instructor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/classes/${item.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
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

export default AdminClassesPage;