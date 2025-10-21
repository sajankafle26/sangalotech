import React from 'react';
import ServiceForm from '@/components/admin/ServiceForm';
import { TechService } from '@/types';

const NewServicePage: React.FC = () => {
    const initialData: Partial<TechService> = {
        id: '',
        title: '',
        description: '',
        longDescription: '',
        imageUrl: '',
        features: [''],
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Tech Service</h1>
            <ServiceForm initialData={initialData} />
        </div>
    );
};

export default NewServicePage;