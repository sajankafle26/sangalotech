import React from 'react';
import JobForm from '@/components/admin/JobForm';
import { Job } from '@/types';

const NewJobPage: React.FC = () => {
    const initialJobData: Partial<Job> = {
        id: '',
        title: '',
        type: 'Full-time',
        location: 'Lokenthali, Bhaktapur',
        department: '',
        description: '',
        responsibilities: [''],
        qualifications: [''],
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Job Posting</h1>
            <JobForm initialData={initialJobData} />
        </div>
    );
};

export default NewJobPage;
