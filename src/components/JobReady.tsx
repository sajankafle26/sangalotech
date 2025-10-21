'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/types';

const ModuleCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
    <div className="relative w-full h-48">
      <Image src={course.imageUrl} alt={course.title} className="object-cover" fill />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-[#00548B]">{course.tag}</h3>
      <h4 className="text-lg font-semibold text-gray-800 mt-1 flex-grow">{course.title}</h4>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{course.description}</p>
      <Link
        href={`/courses/${course.id}`}
        className="mt-4 text-red-500 font-semibold inline-flex items-center self-start"
      >
        View Details <i className="fas fa-arrow-right ml-2"></i>
      </Link>
    </div>
  </div>
);

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-lg shadow text-center">
    <div className="text-4xl text-red-500 mb-4 inline-block">
      <i className={icon}></i>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-gray-100 focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <i
          className={`fas fa-chevron-down transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        ></i>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4 bg-white text-gray-600">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const JobReady: React.FC<{ courses: Course[] }> = ({ courses }) => {
  const jobReadyCourses = courses;

  const faqs = [
    {
      question: 'Do I need any prior coding experience to join this program?',
      answer:
        'Absolutely not! This program is designed for complete beginners. We start from the very basics and guide you step-by-step. All you need is a willingness to learn and a passion for technology.',
    },
    {
      question: "What is the '100% Paid Internship Guarantee'?",
      answer:
        'It&apos;s our promise to you. Upon successfully completing the 4-month program and meeting our graduation criteria, we guarantee you a paid internship at our company or one of our partner companies to kickstart your professional career.',
    },
    {
      question: 'What will the class schedule be like?',
      answer:
        'Classes are typically held for 2 hours per day, from Sunday to Friday. This schedule is designed to be manageable, allowing you to balance the course with other commitments. We offer both morning and evening batches.',
    },
    {
      question: 'What kind of support can I expect during the course?',
      answer:
        "You'll have 24/7 access to our support team via WhatsApp for quick questions. Additionally, our instructors provide in-class support, code reviews on assignments, and dedicated doubt-clearing sessions to ensure you never get stuck.",
    },
    {
      question: 'Are there any installment options for the course fee?',
      answer:
        'Yes, we understand the need for flexibility. We offer installment plans to make the program more accessible. Please contact our admissions team to discuss the options available.',
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#004a61] to-[#00548B] text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline focus:outline-none">
              Home
            </Link>{' '}
            &gt; <span>Job-Ready Program</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Job-Ready Full-Stack Developer Program
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">
            Our most comprehensive program designed to take you from a complete beginner to a
            confident, job-ready MERN stack developer in just 4 months.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Modules */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Program Curriculum: A 4-Month Journey</h2>
            <p className="mt-2 text-gray-600">
              Each module builds upon the last, providing a step-by-step path to mastering web
              development.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {jobReadyCourses.map((course) => (
              <ModuleCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Our Program Works</h2>
            <p className="mt-2 text-gray-600">
              We provide more than just lessons; we provide a launchpad for your new career.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="fas fa-briefcase"
              title="Internship Guarantee"
              description="We stand by our training with a 100% paid internship guarantee upon successful completion."
            />
            <FeatureCard
              icon="fas fa-code"
              title="Project-Based Learning"
              description="Build a portfolio of real-world projects that will impress recruiters and demonstrate your skills."
            />
            <FeatureCard
              icon="fas fa-users"
              title="Expert Instructors"
              description="Learn from industry professionals with years of experience in building and shipping software."
            />
            <FeatureCard
              icon="fas fa-headset"
              title="Dedicated Support"
              description="Get 24/7 support from our team to ensure you never get stuck and are always moving forward."
            />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-gray-600">Have questions? We&apos;ve got answers.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center bg-white p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Start Your Tech Career?</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Enroll today and take the first step towards becoming a professional software developer.
          </p>
          <Link
            href="/upcoming-classes"
            className="mt-8 inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg"
          >
            Enroll Now
          </Link>
        </section>
      </main>
    </div>
  );
};

export default JobReady;
