'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PortfolioItem } from '@/types';

const AdminPortfolioPage: React.FC = () => {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/portfolio');
            if (!res.ok) throw new Error('Failed to fetch portfolio items');
            const data = await res.json();
            setItems(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (itemId: string) => {
        if (!confirm('Are you sure you want to delete this portfolio item?')) {
            return;
        }

        try {
            const res = await fetch(`/api/portfolio/${itemId}`, { method: 'DELETE' });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete item');
            }
            fetchItems(); // Refresh list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Portfolio Management</h1>
                <Link href="/admin/portfolio/new" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Add New Item
                </Link>
            </div>
            
            {loading && <p>Loading portfolio items...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/portfolio/${item.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
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

export default AdminPortfolioPage;