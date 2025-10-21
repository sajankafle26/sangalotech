"use client";
import React, { useState, useEffect } from 'react';
import type { Product } from '../types';

type Tab = 'school' | 'news' | 'clinic';

const ProductTabContent: React.FC<{ product: Product, active: boolean }> = ({ product, active }) => (
    active ? (
        <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
                <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <a href="#" className="px-5 py-2 bg-[#00548B] text-white rounded-lg font-medium shadow hover:bg-[#003f66] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    Learn More
                </a>
            </div>
            <div>
                <img src={product.imageUrl} alt={product.title} className="rounded-lg shadow" />
            </div>
        </div>
    ) : null
);

const Products: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('school');
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fix: Fetching products dynamically.
                const res = await fetch('/api/products');
                if (res.ok) {
                    setProducts(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-16 bg-gray-50" id="products">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    Our <span className="text-[#00548B]">Products</span>
                </h2>

                <div className="w-full">
                    <div className="flex justify-center flex-wrap gap-4 mb-8">
                        <button onClick={() => setActiveTab('school')}
                            className={`px-5 py-2 rounded-lg font-medium shadow-sm transition ${activeTab === 'school' ? 'bg-[#00548B] text-white' : 'bg-white text-gray-700 border'}`}>
                            School Management System
                        </button>
                        <button onClick={() => setActiveTab('news')}
                            className={`px-5 py-2 rounded-lg font-medium shadow-sm transition ${activeTab === 'news' ? 'bg-[#00548B] text-white' : 'bg-white text-gray-700 border'}`}>
                            News Portal with Mobile App
                        </button>
                        <button onClick={() => setActiveTab('clinic')}
                            className={`px-5 py-2 rounded-lg font-medium shadow-sm transition ${activeTab === 'clinic' ? 'bg-[#00548B] text-white' : 'bg-white text-gray-700 border'}`}>
                            Clinic Management System
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        {products.map(product => (
                            <ProductTabContent key={product.id} product={product} active={activeTab === product.id} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
