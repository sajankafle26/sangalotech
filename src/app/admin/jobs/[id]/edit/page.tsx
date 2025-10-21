'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import JobForm from '@/components/admin/JobForm';
import { Job } from '@/types';

const EditJobPage: React.FC = () => {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) return;

        const fetchJob = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok) {
                    throw new Error('Job posting not found');
                }
                const data = await res.json();
                setJob(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load job data');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) return <p>Loading job details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Job Posting</h1>
            {job ? <JobForm initialData={job} isEditing /> : <p>Job data could not be loaded.</p>}
        </div>
    );
};

export default EditJobPage;
