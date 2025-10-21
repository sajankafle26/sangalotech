import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { TechService } from '../types';

const TechServiceDetail: React.FC<{ service: TechService; }> = ({ service }) => {
    return (
        <div className="bg-gray-50"><header className="bg-white shadow-sm"><div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"><p className="text-sm text-gray-500"><Link href="/" className="text-[#00548B] hover:underline focus:outline-none">Home</Link> &amp;gt; <span className="font-medium text-gray-700">{service.title}</span></p><h1 className="text-4xl font-extrabold text-[#00548B] mt-2">{service.title}</h1><p className="mt-4 text-lg text-gray-600 max-w-3xl">{service.description}</p></div></header><main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"><div className="lg:grid lg:grid-cols-5 lg:gap-12">
                    {/* Left Content */}
                    <div className="lg:col-span-3 space-y-8"><div><h2 className="text-2xl font-bold text-gray-800 mb-4">Our Approach</h2><p className="text-gray-600 leading-relaxed">{service.longDescription}</p></div><div className="bg-white p-6 rounded-lg shadow"><h2 className="text-2xl font-bold mb-4">Key Features &amp; Services</h2><ul className="space-y-3">
                                {service.features.map((item, index) => (
                                    <li key={index} className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span className="text-gray-700">{item}</span></li>
                                ))}
                            </ul></div></div>

                    {/* Right Image & CTA */}
                    <div className="lg:col-span-2 mt-10 lg:mt-0"><div className="sticky top-24"><div className="relative aspect-[4/3] rounded-lg shadow-lg overflow-hidden"><Image src={service.imageUrl} alt={service.title} className="object-cover" fill /></div><div className="mt-8 bg-blue-50 border-l-4 border-[#00548B] p-6 rounded-r-lg"><h3 className="text-xl font-bold text-gray-900">Have a project in mind?</h3><p className="mt-2 text-gray-600">Let&apos;s discuss how we can help you achieve your goals.</p><Link href="/contact" className="mt-4 block w-full text-center bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                                    Get a Free Quote
                                </Link></div></div></div></div></main></div>
    );
};

export default TechServiceDetail;