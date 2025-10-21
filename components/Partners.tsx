'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Partner } from '@/types';

const Partners: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                // Fix: Fetching partners dynamically.
                const res = await fetch('/api/partners');
                if (res.ok) {
                    const data = await res.json();
                    setPartners(data);
                }
            } catch (error) {
                console.error("Failed to fetch partners:", error);
            }
        };
        fetchPartners();
    }, []);

    if (partners.length === 0) {
        return null; // Don't render the section if there are no partners
    }

    // Duplicate partners for a seamless marquee effect
    const displayPartners = [...partners, ...partners];

    return (
        <section className="py-10 bg-gray-50">
            <div className="max-w-[1200px] mx-auto px-4 md:px-0 ">
                <div className="max-w-3xl mx-auto text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Trusted By Industry Leaders
                    </h2>
                    <p className="text-sm text-gray-600 italic">
                        We've built lasting relationships with businesses across Nepal, delivering exceptional service with professionalism and integrity.
                    </p>
                </div>

                <div className="relative overflow-hidden group">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
                    <div className="flex items-center gap-12 animate-marquee group-hover:[animation-play-state:paused]">
                        {/* Render logos twice for a seamless loop */}
                        {displayPartners.map((partner, index) => (
                             <Image 
                                key={partner._id ? `${partner._id.toString()}-${index}` : index} 
                                src={partner.logoUrl}
                                width={128}
                                height={64}
                                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition"
                                alt={partner.name} 
                              />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
