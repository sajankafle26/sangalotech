'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioItem } from '@/types';

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="relative rounded-lg overflow-hidden shadow-lg group">
        <Image src={item.imageUrl} alt={item.title} width={800} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div>
                <span className="text-xs font-bold uppercase text-red-400">{item.category}</span>
                <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
            </div>
            {item.liveUrl && (
                 <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-white font-semibold text-sm group/link">
                    View Project <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover/link:translate-x-1"></i>
                </a>
            )}
        </div>
    </div>
);

const Portfolio: React.FC<{ items: PortfolioItem[] }> = ({ items }) => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[1200px] mx-auto space-y-8 md:px-0 px-3">
                <div className="text-center">
                    <h2 className="text-3xl font-bold lg:text-4xl text-gray-900">Our Recent Work</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        We take pride in the solutions we&apos;ve delivered. Here&apos;s a glimpse of our work.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map(item => <PortfolioCard key={item.id} item={item} />)}
                </div>
                
                <div className="text-center">
                    <Link href="/portfolio" className="inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;