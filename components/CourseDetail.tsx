'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Course } from '../types';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const SyllabusAccordion: React.FC<{ items: Course['syllabus'] }> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex justify-between items-center p-4 text-left font-semibold bg-gray-50 hover:bg-gray-100"
                    >
                        <span>{item.title}</span>
                        <i className={`fas fa-chevron-down transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></i>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="p-4 bg-white">
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {item.topics.map((topic, i) => <li key={i}>{topic}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const CourseDetail: React.FC<{ course: Course; }> = ({ course }) => {
    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">Home</Link> &gt; <span className="font-medium text-gray-700">{course.title}</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-[#00548B] mt-2">{course.title}</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl">{course.longDescription}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-800">
                        <div className="flex items-center gap-1.5">
                            <span className="text-yellow-500 font-bold">{course.rating}</span>
                            <i className="fas fa-star text-yellow-400"></i>
                            <span className="text-gray-500">({course.students} students)</span>
                        </div>
                        <div className="flex items-center gap-1.5"><i className="far fa-clock text-gray-500"></i><span>Duration: {course.duration}</span></div>
                        <div className="flex items-center gap-1.5"><i className="fas fa-signal text-gray-500"></i><span>Skill level: {course.skillLevel}</span></div>
                        <div className="flex items-center gap-1.5"><i className="fas fa-globe text-gray-500"></i><span>Language: {course.language}</span></div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* What you will learn */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                {course.whatYouWillLearn.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Syllabus */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Course Syllabus</h2>
                            <SyllabusAccordion items={course.syllabus} />
                        </div>
                        
                        {/* Instructor */}
                        <div className="bg-white p-6 rounded-lg shadow">
                             <h2 className="text-2xl font-bold mb-4">Meet Your Instructor</h2>
                             <div className="flex items-start gap-6">
                                <img src={course.instructor.imageUrl} alt={course.instructor.name} className="w-24 h-24 rounded-full object-cover" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-[#00548B]">{course.instructor.name}</h3>
                                    <p className="text-sm font-medium text-gray-500 mb-2">{course.instructor.title}</p>
                                    <p className="text-gray-600">{course.instructor.bio}</p>
                                </div>
                             </div>
                        </div>

                        {/* Testimonials */}
                        {course.testimonials && course.testimonials.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Student Feedback</h2>
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    loop={course.testimonials.length > 1}
                                    className="rounded-lg shadow"
                                >
                                    {course.testimonials.map((testimonial, index) => (
                                        <SwiperSlide key={index} className="bg-white p-8 rounded-lg">
                                            <div className="flex flex-col h-full">
                                                <div className="flex items-center mb-4">
                                                    <img src={testimonial.imageUrl} alt={testimonial.studentName} className="w-12 h-12 rounded-full object-cover mr-4"/>
                                                    <div>
                                                        <p className="font-semibold">{testimonial.studentName}</p>
                                                        <div className="text-yellow-400">
                                                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 italic flex-grow">"{testimonial.review}"</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>

                    {/* Right Sticky Card */}
                    <div className="mt-10 lg:mt-0">
                        <div className="sticky top-24 bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={course.imageUrl} alt={course.title} className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <p className="text-3xl font-bold mb-4">{course.price}</p>
                                <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">Enroll Now</button>
                                <ul className="mt-6 text-sm space-y-3">
                                    <li className="flex items-center gap-3"><i className="fas fa-video text-gray-500"></i><span>Interactive Live Classes</span></li>
                                    <li className="flex items-center gap-3"><i className="fas fa-infinity text-gray-500"></i><span>Full lifetime access</span></li>
                                    <li className="flex items-center gap-3"><i className="fas fa-file-alt text-gray-500"></i><span>Assignments & Projects</span></li>
                                    <li className="flex items-center gap-3"><i className="fas fa-certificate text-gray-500"></i><span>Certificate of completion</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDetail;