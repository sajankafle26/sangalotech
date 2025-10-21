import React from 'react';
import TeamForm from '@/components/admin/TeamForm';
import { TeamMember } from '@/types';

const NewTeamMemberPage: React.FC = () => {
    const initialData: Partial<TeamMember> = {
        id: '',
        name: '',
        title: '',
        bio: '',
        imageUrl: '',
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Team Member</h1>
            <TeamForm initialData={initialData} />
        </div>
    );
};

export default NewTeamMemberPage;