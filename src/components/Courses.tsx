'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/types';

type Tab = 'js' | 'dm' | 'wp' | 'laravel';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const imageSrc =
    course.imageUrl && course.imageUrl.trim() !== ''
      ? course.imageUrl
      : '/fallback.jpg'; // Make sure this fallback image exists in your public folder

  return (
    <Link
      href={`/courses/${course.id}`}
      className="block text-left bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group"
    >
      <div className="relative">
        <div className="relative w-full h-48">
          <Image
            src={imageSrc}
            alt={course.title || 'Course image'}
            fill
            className="object-cover"
          />
        </div>
        {course.tag && (
          <span className="bg-red-500 px-3 py-1 text-white text-xs font-bold absolute top-3 left-0 rounded-r-full">
            {course.tag}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-800 h-12 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-600 my-2 line-clamp-2 h-8 flex-grow">
          {course.description}
        </p>
        <div className="flex justify-between items-center mt-2 border-t pt-2">
          <span className="text-lg font-bold text-red-500">{course.price}</span>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
            {course.duration}
          </span>
        </div>
      </div>
    </Link>
  );
};

const Courses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('js');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/courses?category=${activeTab}`);
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [activeTab]);

  const tabs: { id: Tab; name: string }[] = [
    { id: 'js', name: 'Web Development' },
    { id: 'dm', name: 'Digital Marketing' },
    { id: 'wp', name: 'WordPress' },
    { id: 'laravel', name: 'PHP Laravel' },
  ];

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="max-w-[1200px] mx-auto space-y-8 md:px-0 px-3">
        <div className="text-center">
          <h2 className="text-3xl font-bold lg:text-4xl text-gray-900">
            Our Job-Ready Programs
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            In-demand programs designed to boost your skills and launch your career in tech.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#00548B] text-white shadow-md'
                  : 'bg-white hover:bg-gray-200 text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div>
          {loading ? (
            <div className="text-center p-8">
              <i className="fas fa-spinner fa-spin text-4xl text-[#00548B]"></i>
              <p className="mt-2 text-gray-600">Loading Courses...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 items-stretch gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
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