'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Job } from '@/types';

interface JobFormProps {
    initialData: Partial<Job>;
    isEditing?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ initialData, isEditing = false }) => {
    const [job, setJob] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJob(prev => ({ ...prev, [name]: value }));
    };

    const handleListChange = (listName: 'responsibilities' | 'qualifications', index: number, value: string) => {
        const newList = [...(job[listName] || [])];
        newList[index] = value;
        setJob(prev => ({ ...prev, [listName]: newList }));
    };

    const addListItem = (listName: 'responsibilities' | 'qualifications') => {
        setJob(prev => ({ ...prev, [listName]: [...(prev[listName] || []), ''] }));
    };

    const removeListItem = (listName: 'responsibilities' | 'qualifications', index: number) => {
        const newList = [...(job[listName] || [])];
        newList.splice(index, 1);
        setJob(prev => ({ ...prev, [listName]: newList }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isEditing ? `/api/jobs/${job.id}` : '/api/jobs';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(job),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} job`);
            }
            router.push('/admin/jobs');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500";
    const labelClass = "block text-sm font-medium text-gray-700";
    const fieldsetClass = "p-4 border rounded-md space-y-4";
    const legendClass = "text-lg font-semibold text-gray-800 px-2";
    const smallButtonClass = "px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600";
    const addButtonClass = "px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600";

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Job Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="id" className={labelClass}>Job ID (Unique Slug)</label>
                        <input type="text" name="id" id="id" value={job.id || ''} onChange={handleChange} required disabled={isEditing} className={`${inputClass} disabled:bg-gray-100`} />
                    </div>
                    <div>
                        <label htmlFor="title" className={labelClass}>Job Title</label>
                        <input type="text" name="title" id="title" value={job.title || ''} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="type" className={labelClass}>Job Type</label>
                        <select name="type" id="type" value={job.type || 'Full-time'} onChange={handleChange} className={inputClass}>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="location" className={labelClass}>Location</label>
                        <input type="text" name="location" id="location" value={job.location || ''} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="department" className={labelClass}>Department</label>
                        <input type="text" name="department" id="department" value={job.department || ''} onChange={handleChange} required className={inputClass} />
                    </div>
                     <div className="md:col-span-2">
                        <label htmlFor="description" className={labelClass}>Description</label>
                        <textarea name="description" id="description" value={job.description || ''} onChange={handleChange} rows={4} required className={inputClass} />
                    </div>
                </div>
            </fieldset>

            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Responsibilities</legend>
                {job.responsibilities?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input type="text" value={item} onChange={(e) => handleListChange('responsibilities', index, e.target.value)} className={`${inputClass} w-full`} />
                        <button type="button" onClick={() => removeListItem('responsibilities', index)} className={smallButtonClass}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addListItem('responsibilities')} className={addButtonClass}>Add Responsibility</button>
            </fieldset>

            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Qualifications</legend>
                {job.qualifications?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input type="text" value={item} onChange={(e) => handleListChange('qualifications', index, e.target.value)} className={`${inputClass} w-full`} />
                        <button type="button" onClick={() => removeListItem('qualifications', index)} className={smallButtonClass}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addListItem('qualifications')} className={addButtonClass}>Add Qualification</button>
            </fieldset>

            {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isEditing ? 'Update Job' : 'Create Job')}
                </button>
            </div>
        </form>
    );
};

export default JobForm;
