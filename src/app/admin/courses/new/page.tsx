import React from 'react';
import CourseForm from '@/components/admin/CourseForm';
import { Course } from '@/types';

const NewCoursePage: React.FC = () => {
    const initialCourseData: Partial<Course> = {
        id: '',
        title: '',
        category: 'js',
        description: '',
        longDescription: '',
        price: '',
        duration: '',
        imageUrl: '',
        tag: '',
        skillLevel: 'Beginner',
        language: 'English',
        students: 0,
        rating: 0,
        whatYouWillLearn: [''],
        syllabus: [{ title: '', topics: [''] }],
        instructor: { name: '', title: '', bio: '', imageUrl: '' },
        testimonials: [{ studentName: '', review: '', imageUrl: '' }],
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Course</h1>
            <CourseForm initialData={initialCourseData} />
        </div>
    );
};

export default NewCoursePage;