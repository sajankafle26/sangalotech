'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TeamMember } from '@/types';

const AdminTeamPage: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/team');
            if (!res.ok) throw new Error('Failed to fetch team members');
            const data = await res.json();
            setMembers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (memberId: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) {
            return;
        }

        try {
            const res = await fetch(`/api/team/${memberId}`, { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete member');
            }
            fetchMembers(); // Refresh list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
                <Link href="/admin/team/new" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Add New Member
                </Link>
            </div>
            
            {loading && <p>Loading team members...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map((member) => (
                                <tr key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/team/${member.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                        <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900">Delete</button>
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

export default AdminTeamPage;