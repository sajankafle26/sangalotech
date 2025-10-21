'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Course } from '../types';
import Image from 'next/image';

type Tab = 'js' | 'dm' | 'wp' | 'laravel';

const CourseCard: React.FC<{ course: Course; }> = ({ course }) => (
    <Link href={`/courses/${course.id}`} className="block text-left bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group">
        <div className="relative">
            <div className="relative w-full h-48">
                <Image src={course.imageUrl} className="object-cover" alt={course.title} fill />
            </div>
            {course.tag && (
                <span className="bg-red-500 px-3 py-1 text-white text-xs font-bold absolute top-3 left-0 rounded-r-full">
                    {course.tag}
                </span>
            )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-base font-bold text-gray-800 h-12 line-clamp-2">{course.title}</h3>
            <p className="text-xs text-gray-600 my-2 line-clamp-2 h-8 flex-grow">{course.description}</p>
            <div className="flex justify-between items-center mt-2 border-t pt-2">
                <span className="text-lg font-bold text-red-500">{course.price}</span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">{course.duration}</span>
            </div>
        </div>
    </Link>
);


const Courses: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('js');
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                // Fix: Fetching courses dynamically based on the active tab.
                const res = await fetch(`/api/courses?category=${activeTab}`);
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [activeTab]);

    const tabs: { id: Tab; name: string }[] = [
        { id: 'js', name: 'Web Development (JavaScript 4 months / 4 Modules)' },
        { id: 'dm', name: 'Digital Marketing (2 months)' },
        { id: 'wp', name: 'WordPress (2 months)' },
        { id: 'laravel', name: 'PHP Laravel (2 months)' },
    ];

    return (
        <section className="popular_course py-10 bg-[#f9f9f9]">
            <div className="max-w-[1200px] mx-auto space-y-5 md:px-0 px-3">
                <div className="flex justify-between items-center">
                    <div className="md:w-[70%]">
                        <h2 className="text-[32px] font-bold lg:text-[38px] leading-[110%]">Job-Ready Programs</h2>
                        <p className="text-sm italic">
                            Our most in-demand programs, chosen and loved by learners to boost skills and career growth.
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <a href="#" className="text-[var(--red)] font-semibold hover:underline flex items-center gap-1.5 text-[15px] justify-center mt-4">
                            View All <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start text-[14px]">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`tab-btn px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-[#00548B] text-white'
                                    : 'bg-gray-200 hover:bg-red-100 text-gray-700'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                <div>
                    {loading ? (
                         <div className="text-center p-8">
                            <i className="fas fa-spinner fa-spin text-4xl text-[#00548B]"></i>
                            <p className="mt-2 text-gray-600">Loading Courses...</p>
                         </div>
                    ) : courses.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 items-stretch gap-6">
                           {courses.map(course => <CourseCard key={course.id} course={course} />)}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-white rounded-lg shadow">
                            <p className="text-gray-600">No courses found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Courses;
