import React from 'react';
import Link from 'next/link';
import { UpcomingClass } from '@/types';

const UpcomingClassCard: React.FC<{ session: UpcomingClass }> = ({ session }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-shrink-0 text-center sm:text-left">
            <div className="text-red-500 font-bold text-lg">{new Date(session.startDate).toLocaleString('en-US', { month: 'short' })}</div>
            <div className="text-3xl font-extrabold text-gray-800">{new Date(session.startDate).getDate()}</div>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-4 flex-grow">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{session.courseTitle}</h3>
            <div className="text-sm text-gray-500 mt-1 space-y-1">
                <p><i className="far fa-clock w-4 mr-1"></i>{session.time}</p>
                <p><i className="fas fa-chalkboard-teacher w-4 mr-1"></i>{session.instructor}</p>
            </div>
            <Link href={`/courses/${session.courseId}`} className="text-sm font-semibold text-red-500 hover:text-red-700 mt-2 inline-block">
                View Course &rarr;
            </Link>
        </div>
    </div>
);


const UpcomingClassesHome: React.FC<{ classes: UpcomingClass[] }> = ({ classes }) => {
    if (!classes || classes.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-blue-50">
            <div className="max-w-[1200px] mx-auto space-y-8 md:px-0 px-3">
                <div className="text-center">
                    <h2 className="text-3xl font-bold lg:text-4xl text-gray-900">Upcoming Classes</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Enroll in our next batch and kickstart your tech career. Spots are filling up fast!
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {classes.map(session => (
                        <UpcomingClassCard key={session.id} session={session} />
                    ))}
                </div>
                <div className="text-center">
                    <Link href="/upcoming-classes" className="inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                        View Full Schedule
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default UpcomingClassesHome;