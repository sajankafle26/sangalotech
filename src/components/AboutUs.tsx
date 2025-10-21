import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { TeamMember, CompanyValue } from '@/types';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="bg-white rounded-lg shadow-md text-center p-6 transform hover:-translate-y-2 transition-transform duration-300"><div className="relative w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-gray-100"><Image
                src={member.imageUrl}
                alt={`Photo of ${member.name}`}
                className="object-cover"
                fill
            /></div><h3 className="text-xl font-bold text-[#00548B]">{member.name}</h3><p className="text-sm font-semibold text-gray-500 mb-2">{member.title}</p><p className="text-gray-600 text-sm">{member.bio}</p></div>
);

const FeatureCard: React.FC<{ value: CompanyValue }> = ({ value }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:shadow-xl transition-shadow duration-300"><div className="text-4xl text-red-500 mb-4 inline-block"><i className={value.icon}></i></div><h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3><p className="text-gray-600">{value.description}</p></div>
);


const AboutUs: React.FC<{ teamMembers: TeamMember[], companyValues: CompanyValue[] }> = ({ teamMembers, companyValues }) => {
    return (
        <div className="bg-gray-50"><header className="bg-gradient-to-r from-[#004a61] to-[#00548B] text-white"><div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center"><p className="text-sm uppercase tracking-wider mb-2"><Link href="/" className="hover:underline focus:outline-none">Home</Link> &amp;gt; <span>About Us</span></p><h1 className="text-4xl md:text-5xl font-extrabold">About Sangalo Tech</h1><p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">
                        Empowering the next generation of tech talent and building innovative solutions for businesses in Nepal and beyond.
                    </p></div></header><main className="py-16">
                {/* Our Story Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"><div className="grid md:grid-cols-2 gap-12 items-center"><div className="order-2 md:order-1"><h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2><p className="text-gray-600 mb-4 leading-relaxed">
                                Founded with the vision of bridging the gap between theoretical education and the practical skills demanded by the tech industry, Sangalo Tech has grown from a small training center to a dynamic tech company.
                            </p><p className="text-gray-600 leading-relaxed">
                                Our mission is two-fold: to provide aspiring developers with job-ready skills through intensive, project-based training, and to offer businesses top-tier technology services that drive growth and efficiency. We believe in the power of technology to transform lives and are dedicated to building a stronger tech ecosystem in Nepal.
                            </p></div><div className="order-1 md:order-2 relative aspect-video"><Image src="https://picsum.photos/seed/teamwork/600/400" alt="Team working together" className="rounded-lg shadow-lg" fill style={{objectFit: 'cover'}}/></div></div></section>

                {/* Team Section */}
                <section className="mb-20 bg-white py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2><p className="mt-2 text-gray-600">The passionate individuals driving our mission forward.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map(member => (
                                <TeamMemberCard key={member.id} member={member} />
                            ))}
                        </div></div></section>
                
                {/* Our Core Values Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2><p className="mt-2 text-gray-600">The principles that guide everything we do.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {companyValues.map((value, index) => (
                            <FeatureCard key={index} value={value} />
                        ))}
                    </div></section></main></div>
    );
};

export default AboutUs;