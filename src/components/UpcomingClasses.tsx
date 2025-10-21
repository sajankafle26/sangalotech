'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ClassInfo {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time: string;
  imageUrl: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const UpcomingClasses: React.FC = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [email, setEmail] = useState('');

  // Load sample classes (you can replace with API call)
  useEffect(() => {
    const sampleClasses: ClassInfo[] = [
      {
        id: 1,
        title: 'Full-Stack Web Development Bootcamp',
        instructor: 'Sajan Kafle',
        date: 'Nov 10, 2025',
        time: '10:00 AM – 2:00 PM',
        imageUrl: '/images/webdev.jpg',
      },
      {
        id: 2,
        title: 'Digital Marketing Masterclass',
        instructor: 'Sabina Karki',
        date: 'Nov 15, 2025',
        time: '11:00 AM – 1:00 PM',
        imageUrl: '/images/marketing.jpg',
      },
      {
        id: 3,
        title: 'Graphic Design for Beginners',
        instructor: 'Raju Shrestha',
        date: 'Dec 1, 2025',
        time: '9:00 AM – 12:00 PM',
        imageUrl: '/images/graphics.jpg',
      },
    ];
    setClasses(sampleClasses);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 bg-gray-50" id="upcoming-classes">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Upcoming <span className="text-[#00548B]">Classes</span>
          </h2>
          <p className="text-gray-600">
            Join our latest sessions and take your career to the next level.
          </p>
        </motion.div>

        {/* Classes Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={cls.imageUrl}
                  alt={cls.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {cls.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Instructor: {cls.instructor}
                </p>
                <p className="text-sm text-gray-600">
                  {cls.date} • {cls.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscription Form */}
        <div className="mt-16 max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Stay Updated
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Get notified about our upcoming classes and exclusive learning
            opportunities.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[#00548B] text-white py-2 rounded-md font-medium hover:bg-[#00406e] transition"
            >
              {status === 'submitting' ? 'Submitting...' : 'Subscribe'}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-green-600 mt-4 text-center">
              Thanks! You&apos;re now subscribed for updates.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingClasses;
