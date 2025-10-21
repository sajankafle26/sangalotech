'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioItem } from '@/types';

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="relative rounded-lg overflow-hidden shadow-lg group animate-fade-in">
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


const PortfolioPage = () => {
    const [allItems, setAllItems] = useState<PortfolioItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/portfolio');
                if (res.ok) {
                    const data: PortfolioItem[] = await res.json();
                    setAllItems(data);
                    setFilteredItems(data);
                    const uniqueCategories = ['All', ...Array.from(new Set(data.map(item => item.category)))];
                    setCategories(uniqueCategories);
                }
            } catch (error) {
                console.error("Failed to fetch portfolio:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    const handleFilter = (category: string) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredItems(allItems);
        } else {
            setFilteredItems(allItems.filter(item => item.category === category));
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">Home</Link> &gt; <span className="font-medium text-gray-700">Our Portfolio</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-[#00548B] mt-2">Our Work Portfolio</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl">A collection of our finest projects, showcasing our expertise and commitment to quality across various industries.</p>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {loading ? (
                     <div className="text-center p-16">
                        <i className="fas fa-spinner fa-spin text-5xl text-[#00548B]"></i>
                     </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-2 justify-center mb-10">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleFilter(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                        activeCategory === category
                                            ? 'bg-[#00548B] text-white shadow-md'
                                            : 'bg-white hover:bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map(item => <PortfolioCard key={item.id} item={item} />)}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default PortfolioPage;