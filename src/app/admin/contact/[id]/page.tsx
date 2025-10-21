'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ContactMessage } from '@/types';

const ContactMessageViewPage: React.FC = () => {
    const [message, setMessage] = useState<ContactMessage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;
        const fetchMessage = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/contact/${id}`);
                if (!res.ok) throw new Error('Message not found');
                const data = await res.json();
                setMessage(data);

                // Mark as read
                if (!data.isRead) {
                    await fetch(`/api/contact/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isRead: true }),
                    });
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load message');
            } finally {
                setLoading(false);
            }
        };
        fetchMessage();
    }, [id]);

    if (loading) return <p>Loading message...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!message) return <p>Message not found.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Contact Message</h1>
                <Link href="/admin/contact" className="text-sm text-indigo-600 hover:underline">
                    &larr; Back to all messages
                </Link>
            </div>
            
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold">{message.subject}</h2>
                    <p className="text-sm text-gray-500">
                        From: {message.name} &lt;<a href={`mailto:${message.email}`} className="text-indigo-600">{message.email}</a>&gt;
                    </p>
                    {message.phone && <p className="text-sm text-gray-500">Phone: <a href={`tel:${message.phone}`} className="text-indigo-600">{message.phone}</a></p>}
                    <p className="text-sm text-gray-500">Received: {new Date(message.receivedAt).toLocaleString()}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md border">
                    <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
                </div>

                 <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-2">Reply to {message.name}</h3>
                    <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                       className="inline-block px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                        Reply via Email
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactMessageViewPage;
