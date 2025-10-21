'use client';

import React, { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface CourseInfo {
  id: string;
  title: string;
}

interface BookingModalProps {
  course: CourseInfo;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ course, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
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

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, course }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      setStatus('success');
      setMessage(data.message || 'Booking successful! We will contact you shortly.');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all">
        {/* Modal Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Book Your Spot</h2>
              <p className="text-sm text-gray-600 mt-1">
                For:{' '}
                <span className="font-semibold text-[#00548B]">{course.title}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {status === 'success' ? (
          <div className="p-8 text-center">
            <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
            <h3 className="text-2xl font-bold text-gray-800">Success!</h3>
            <p className="text-gray-600 mt-2">{message}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {status === 'error' && (
                <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm">
                  {message}
                </p>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Jane Doe"
                  disabled={status === 'loading'}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., you@example.com"
                  disabled={status === 'loading'}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., 98xxxxxxxx"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 flex justify-end gap-3 rounded-b-lg">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
                disabled={status === 'loading'}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors flex items-center justify-center w-28"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  'Book Now'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
