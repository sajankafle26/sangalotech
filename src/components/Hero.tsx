'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const HeroCourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="border-2 border-[#004A61] bg-white rounded-2xl shadow-lg p-4 overflow-hidden h-full">
    <div className="relative w-full h-40">
      <Image
        src={course.imageUrl || '/fallback.jpg'}
        alt={course.title || 'Course image'}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-lg"
      />
    </div>
    <div className="p-3">
      <h3 className="font-bold text-lg h-12 line-clamp-2">{course.title}</h3>
      <p className="text-sm text-gray-600 h-12 line-clamp-2">{course.description}</p>
      <div className="flex justify-between items-center my-3">
        <span className="text-base font-bold text-red-500">{course.price}</span>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded font-medium">
          {course.duration}
        </span>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses?category=js&limit=4');
        if (!res.ok) throw new Error('Failed to fetch hero courses');
        const data: Course[] = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch hero courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="py-10 md:px-0 px-3" style={{ backgroundColor: '#B5E1FF' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 items-center gap-5 md:gap-10">
          {/* Left Text Content */}
          <div className="flex flex-col justify-between md:gap-10 order-2 md:order-1 md:col-span-2">
            <div className="space-y-[20px] md:space-y-[24px]">
              <p className="text-[12px] md:text-[16px]">
                Affordable Fee | Interactive Classes | 100% Paid Internship Guarantee
              </p>
              <h1 className="text-[22px] md:text-[26px] lg:text-[30px] xl:text-[38px] leading-[110%] font-bold">
                Become A{' '}
                <span className="font-bold text-[#00548B]">
                  Job-Ready Full-Stack Software Developer
                </span>{' '}
                In Just 12 Weeks
              </h1>
              <p className="font-bold">
                ...Even If You&apos;ve Never Written a Single Line of Code Before
              </p>
              <ul className="space-y-2">
                <li>🕮 Module I (UI UX Design Training in Nepal)</li>
                <li>🕮 Module II (Web Design Training in Nepal)</li>
                <li>🕮 Module III (React/Next.js Development Training)</li>
                <li>🕮 Module IV (MongoDB, ExpressJS, ReactJS & Node.js Training in Nepal)</li>
              </ul>
              <div className="mt-6 mb-4 flex gap-2 text-sm lg:text-base">
                <Link
                  href="/courses/js1"
                  className="w-[50%] bg-[#00548B] hover:bg-[#003f66] flex items-center text-white gap-1 transition-all duration-300 rounded-md justify-center py-2 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  <i className="fa-solid fa-chalkboard"></i> Explore Courses
                </Link>
              </div>
            </div>
          </div>

          {/* Right Swiper */}
          <div className="order-1 md:order-2 flex justify-center items-center">
            <Swiper
              effect="cards"
              grabCursor
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-[280px] h-[400px] sm:w-[320px] sm:h-[440px]"
            >
              {courses.map((course) => (
                <SwiperSlide key={course.id}>
                  <HeroCourseCard course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
