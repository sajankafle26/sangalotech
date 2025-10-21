'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TeamForm from '@/components/admin/TeamForm';
import { TeamMember } from '@/types';

const EditTeamMemberPage: React.FC = () => {
    const [member, setMember] = useState<TeamMember | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;
        const fetchMember = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/team/${id}`);
                if (!res.ok) throw new Error('Team member not found');
                const data = await res.json();
                setMember(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load member data');
            } finally {
                setLoading(false);
            }
        };
        fetchMember();
    }, [id]);

    if (loading) return <p>Loading member details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Team Member</h1>
            {member ? <TeamForm initialData={member} isEditing /> : <p>Member data could not be loaded.</p>}
        </div>
    );
};

export default EditTeamMemberPage;