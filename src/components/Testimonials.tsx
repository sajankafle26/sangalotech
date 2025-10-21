'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { StudentTestimonial, ClientTestimonial } from '@/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Tab = 'students' | 'clients';
type Testimonial = StudentTestimonial | ClientTestimonial;

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const isStudent = 'course' in testimonial;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col justify-between">
      <i className="fas fa-quote-left text-3xl text-red-200 mb-4"></i>
      <p className="text-gray-600 italic flex-grow mb-6">&quot;{testimonial.review}&quot;</p>
      <div className="flex items-center">
        <Image
          src={testimonial.imageUrl}
          alt={testimonial.name}
          width={56}
          height={56}
          className="rounded-full object-cover mr-4 border-2 border-red-100"
        />
        <div>
          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{isStudent ? testimonial.course : testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('students');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeTab === 'students'
            ? '/api/testimonials/students'
            : '/api/testimonials/clients';
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Testimonial[] = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error(`Failed to fetch ${activeTab}:`, error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [activeTab]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our <span className="text-[#00548B]">Community</span> Says
          </h2>
          <p className="text-gray-600 mt-2">
            Hear from the students and businesses who have grown with us.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 rounded-full p-1 flex gap-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'students' ? 'bg-white text-[#00548B] shadow' : 'text-gray-600 hover:bg-gray-300'
              }`}
            >
              Student Feedback
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'clients' ? 'bg-white text-[#00548B] shadow' : 'text-gray-600 hover:bg-gray-300'
              }`}
            >
              Client Stories
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center p-8">
            <i className="fas fa-spinner fa-spin text-4xl text-[#00548B]"></i>
          </div>
        ) : (
          <Swiper
            key={activeTab}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={testimonials.length > 2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-12"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={'_id' in item ? item._id : index}>
                <TestimonialCard testimonial={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
