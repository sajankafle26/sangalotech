import React from 'react';
import StudentTestimonialForm from '@/components/admin/StudentTestimonialForm';
import { StudentTestimonial } from '@/types';

const NewStudentTestimonialPage: React.FC = () => {
    const initialData: Partial<StudentTestimonial> = {
        name: '',
        course: '',
        review: '',
        imageUrl: '',
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Student Testimonial</h1>
            <StudentTestimonialForm initialData={initialData} />
        </div>
    );
};

export default NewStudentTestimonialPage;