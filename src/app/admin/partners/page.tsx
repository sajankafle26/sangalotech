'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Partner } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

const AdminPartnersPage: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [newName, setNewName] = useState('');
    const [newLogoUrl, setNewLogoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchPartners = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/partners');
            if (!res.ok) throw new Error('Failed to fetch partners');
            const data = await res.json();
            setPartners(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this partner?')) return;
        try {
            const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete partner');
            }
            fetchPartners();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newLogoUrl) {
            alert('Please provide a name and upload a logo.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, logoUrl: newLogoUrl }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to add partner');
            }
            setNewName('');
            setNewLogoUrl('');
            fetchPartners();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Partner</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Partner Name</label>
                        <input type="text" id="name" value={newName} onChange={(e) => setNewName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"/>
                    </div>
                    <ImageUpload label="Partner Logo" value={newLogoUrl} onChange={setNewLogoUrl} />
                    <div className="text-right">
                         <button type="submit" disabled={submitting} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                            {submitting ? 'Adding...' : 'Add Partner'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Partners</h1>
                {loading && <p>Loading partners...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <ul className="space-y-3">
                        {partners.map((partner) => (
                            <li key={partner._id?.toString()} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                                <div className="flex items-center gap-4">
                                    <Image src={partner.logoUrl} alt={partner.name} width={100} height={40} className="object-contain h-10 w-28" />
                                    <span className="font-medium text-gray-800">{partner.name}</span>
                                </div>
                                <button onClick={() => handleDelete(partner._id!.toString())} className="text-red-500 hover:text-red-700 text-sm font-semibold">
                                    <i className="fas fa-trash-alt mr-1"></i> Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminPartnersPage;