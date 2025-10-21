'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ContactMessage } from '@/types';

const AdminContactPage: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/contact');
            if (!res.ok) throw new Error('Failed to fetch messages');
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete message');
            }
            fetchMessages();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h1>
            
            {loading && <p>Loading messages...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {messages.map((msg) => (
                                <tr key={msg._id?.toString()} className={`${!msg.isRead ? 'font-bold' : ''}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{msg.name}</div>
                                        <div className="text-sm text-gray-500">{msg.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{msg.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(msg.receivedAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/contact/${msg._id?.toString()}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            View
                                        </Link>
                                        <button onClick={() => handleDelete(msg._id!.toString())} className="text-red-600 hover:text-red-900">
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

export default AdminContactPage;
