import React from 'react';
import ClassForm from '@/components/admin/ClassForm';
import { UpcomingClass } from '@/types';

const NewClassPage: React.FC = () => {
    const initialData: Partial<UpcomingClass> = {
        id: '',
        courseId: '',
        courseTitle: '',
        startDate: '',
        day: '',
        time: '',
        instructor: '',
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Class</h1>
            <ClassForm initialData={initialData} />
        </div>
    );
};

export default NewClassPage;