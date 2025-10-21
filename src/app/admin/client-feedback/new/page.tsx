import React from 'react';
import ClientTestimonialForm from '@/components/admin/ClientTestimonialForm';
import { ClientTestimonial } from '@/types';

const NewClientTestimonialPage: React.FC = () => {
    const initialData: Partial<ClientTestimonial> = {
        name: '',
        company: '',
        review: '',
        imageUrl: '',
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Client Testimonial</h1>
            <ClientTestimonialForm initialData={initialData} />
        </div>
    );
};

export default NewClientTestimonialPage;