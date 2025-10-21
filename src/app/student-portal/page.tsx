import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Student Portal | Sangalo Tech',
    description: 'Login to the Sangalo Tech student portal to access your courses, materials, and support.',
};

const StudentPortalPage = () => {
    return (
        <div className="bg-gray-50 min-h-[60vh] flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">
                            Home
                        </Link>{' '}
                        &gt; <span className="font-medium text-gray-700">Student Portal</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-[#00548B] mt-2">Student Portal</h1>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-12 rounded-lg shadow-lg">
                        <i className="fas fa-tools text-6xl text-gray-300 mb-6"></i>
                        <h2 className="text-3xl font-bold text-gray-800">Coming Soon!</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Our dedicated student portal is currently under construction.
                        </p>
                        <p className="mt-2 text-gray-600">
                            Soon, you&apos;ll be able to access your course materials, track your progress, and connect with instructors right here.
                        </p>
                        <Link
                            href="/"
                            className="mt-8 inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                        >
                            Go Back to Homepage
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentPortalPage;
