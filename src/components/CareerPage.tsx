'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Job } from '@/types';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="bg-white rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"><button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-6"
                aria-expanded={isOpen}
            >
                <div className="flex justify-between items-center"><div><h3 className="text-xl font-bold text-gray-800">{job.title}</h3><p className="text-sm text-gray-500 mt-1">
                            {job.department} &bull; {job.location}
                        </p></div><div className="flex items-center gap-4"><span className="text-xs font-semibold uppercase px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{job.type}</span><i className={`fas fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i></div></div></button><div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}><div className="px-6 pb-6 border-t pt-4"><p className="text-gray-600 mb-6">{job.description}</p><div className="grid md:grid-cols-2 gap-6"><div><h4 className="font-semibold text-gray-800 mb-2">Responsibilities</h4><ul className="list-disc list-inside space-y-1 text-gray-600">
                                {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                            </ul></div><div><h4 className="font-semibold text-gray-800 mb-2">Qualifications</h4><ul className="list-disc list-inside space-y-1 text-gray-600">
                                {job.qualifications.map((item, index) => <li key={index}>{item}</li>)}
                            </ul></div></div><div className="mt-6"><Link href="/contact" className="inline-block bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors">
                            Apply Now
                        </Link></div></div></div></div>
    );
};

const CareerPage: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
    const internships = jobs.filter(j => j.type === 'Internship');
    const fullTimeJobs = jobs.filter(j => j.type === 'Full-time');
    const otherJobs = jobs.filter(j => j.type !== 'Internship' && j.type !== 'Full-time');

    return (
         <div className="bg-gray-50"><header className="bg-gradient-to-r from-[#004a61] to-[#00548B] text-white"><div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center"><p className="text-sm uppercase tracking-wider mb-2"><Link href="/" className="hover:underline focus:outline-none">Home</Link> &amp;gt; <span>Career</span></p><h1 className="text-4xl md:text-5xl font-extrabold">Join Our Team</h1><p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">
                        We&apos;re looking for passionate individuals to join us in our mission to innovate and build the future of tech. Explore our open positions below.
                    </p></div></header><main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {jobs.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-lg shadow"><i className="fas fa-search text-5xl text-gray-300 mb-4"></i><h2 className="text-2xl font-bold text-gray-800">No Openings Available</h2><p className="text-gray-600 mt-2">
                            We are not actively hiring at the moment, but we are always interested in talented individuals. Feel free to send your resume to our HR department.
                        </p><Link href="/contact" className="mt-6 inline-block bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors">
                            Contact HR
                        </Link></div>
                ) : (
                    <div className="space-y-12">
                        {internships.length > 0 && (
                            <section><h2 className="text-3xl font-bold text-gray-900 mb-6">Internships</h2><div className="space-y-4">
                                    {internships.map(job => <JobCard key={job.id} job={job} />)}
                                </div></section>
                        )}
                        {fullTimeJobs.length > 0 && (
                             <section><h2 className="text-3xl font-bold text-gray-900 mb-6">Full-time Positions</h2><div className="space-y-4">
                                    {fullTimeJobs.map(job => <JobCard key={job.id} job={job} />)}
                                </div></section>
                        )}
                        {otherJobs.length > 0 && (
                             <section><h2 className="text-3xl font-bold text-gray-900 mb-6">Other Opportunities</h2><div className="space-y-4">
                                    {otherJobs.map(job => <JobCard key={job.id} job={job} />)}
                                </div></section>
                        )}
                    </div>
                )}
            </main></div>
    );
};

export default CareerPage;
