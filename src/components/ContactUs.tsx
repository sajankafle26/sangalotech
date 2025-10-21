'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
      setResponseMessage(data.message || 'Thank you for your message! We will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setResponseMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header / Breadcrumb */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">
              Home
            </Link>{' '}
            &gt;{' '}
            <span className="font-medium text-gray-700">Contact Us</span>
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Contact Us</h1>
        </div>
      </header>

      {/* Contact Form */}
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-[#00548B] focus:border-[#00548B]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-[#00548B] focus:border-[#00548B]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-[#00548B] focus:border-[#00548B]"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-[#00548B] focus:border-[#00548B]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-[#00548B] focus:border-[#00548B]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-[#00548B] text-white font-semibold rounded-md hover:bg-[#004070] transition disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {responseMessage && (
            <p
              className={`text-center text-sm mt-4 ${
                status === 'success'
                  ? 'text-green-600'
                  : status === 'error'
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {responseMessage}
            </p>
          )}
        </form>
      </main>
    </div>
  );
};

export default ContactUs;
