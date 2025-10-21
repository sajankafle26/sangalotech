
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// Fix: Removed static data import to use props instead.
import type { UpcomingClass } from '../types';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const BookingModal: React.FC<{
    session: UpcomingClass;
    onClose: () => void;
}> = ({ session, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        // This is a placeholder for a real API call
        // In a real app, you would POST to an API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate success
        console.log('Form Submitted', { ...formData, courseDetails: session });
        setStatus('success');
        setMessage('Booking successful! We will contact you shortly.');
        setFormData({ name: '', email: '', phone: '' });

        // Simulate error
        // setStatus('error');
        // setMessage('An unexpected error occurred. Please try again.');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Book Your Spot</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                For: <span className="font-semibold text-[#00548B]">{session.courseTitle}</span>
                            </p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                            <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                {status === 'success' ? (
                     <div className="p-8 text-center">
                        <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800">Success!</h3>
                        <p className="text-gray-600 mt-2">{message}</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors">
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-4">
                             {status === 'error' && <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm">{message}</p>}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="e.g., Jane Doe"
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="e.g., you@example.com"
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="e.g., 98xxxxxxxx"
                                    disabled={status === 'loading'}
                                />
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 flex justify-end gap-3 rounded-b-lg">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium" disabled={status === 'loading'}>
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors flex items-center justify-center w-28" disabled={status === 'loading'}>
                                {status === 'loading' ? <i className="fas fa-spinner fa-spin"></i> : 'Book Now'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};


// Fix: Updated component to accept `classes` prop to resolve the error.
const UpcomingClasses: React.FC<{ classes: UpcomingClass[] }> = ({ classes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<UpcomingClass | null>(null);

    const handleEnrollClick = (session: UpcomingClass) => {
        setSelectedClass(session);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedClass(null);
    };

    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">Home</Link> &gt; <span className="font-medium text-gray-700">Upcoming Classes</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-[#00548B] mt-2">Upcoming Training Sessions</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl">Here is the schedule for our upcoming classes. Book your spot now before they are full!</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Start Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Instructor
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Enroll</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {classes.map((session) => (
                                    <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={`/courses/${session.courseId}`} className="text-sm font-semibold text-gray-900 hover:text-red-600">{session.courseTitle}</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{session.startDate}</div>
                                            <div className="text-xs text-gray-500">{session.day}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{session.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {session.instructor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEnrollClick(session)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Enroll Now</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                 <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg border-l-4 border-[#00548B]">
                    <h3 className="text-xl font-bold text-gray-900">Can't Find a Suitable Time?</h3>
                    <p className="mt-2 text-gray-600">Contact us for custom batch inquiries or to be notified about future schedules.</p>
                    <Link href="/contact" className="mt-4 inline-block bg-[#00548B] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#003f66] transition-colors">
                        Contact Us
                    </Link>
                </div>
            </main>

            {isModalOpen && selectedClass && (
                <BookingModal
                    session={selectedClass}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default UpcomingClasses;
