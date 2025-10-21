'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TechService, SiteSettings } from '@/types';

interface FooterProps {
    settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
    const [services, setServices] = useState<TechService[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                if (res.ok) {
                    const data = await res.json();
                    setServices(data);
                }
            } catch (error) {
                console.error("Failed to fetch services for footer:", error);
            }
        };
        fetchServices();
    }, []);

    return (
        <footer className="py-10 bg-[#00548B] text-white px-5 text-[14px]">
            <div className="max-w-[1200px] mx-auto md:px-0 px-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 border-b pb-4 border-gray-400 border-opacity-50">
                    
                    <div className="space-y-4 lg:col-span-3">
                        <Image src={settings.logoUrlWhite} alt="Sangalo Tech White Logo" width={200} height={50} />
                        <ul className="text-gray-300">
                            <li>Lokenthali, Bhaktapur</li>
                            <li>Reg No. 11757/6371/04</li>
                            <li>PAN No. 602345817</li>
                        </ul>
                        <ul className="flex gap-4 text-xl mt-2">
                            <li><a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook" className="text-gray-300 hover:text-white transition-colors duration-200"><i className="fa-brands fa-facebook"></i></a></li>
                            <li><a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram" className="text-gray-300 hover:text-white transition-colors duration-200"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href={settings.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit YouTube" className="text-gray-300 hover:text-white transition-colors duration-200"><i className="fa-brands fa-youtube"></i></a></li>
                            <li><a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn" className="text-gray-300 hover:text-white transition-colors duration-200"><i className="fa-brands fa-linkedin"></i></a></li>
                        </ul>
                    </div>

                    <div className="space-y-2 lg:col-span-2">
                        <h2 className="text-xl font-bold">Quick Links</h2>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link href="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
                            <li><Link href="/courses/js1" className="hover:text-white transition-colors duration-200">All Courses</Link></li>
                            <li><Link href="/upcoming-classes" className="hover:text-white transition-colors duration-200">Upcoming Classes</Link></li>
                            <li><Link href="/blogs" className="hover:text-white transition-colors duration-200">Blogs</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-2 lg:col-span-2">
                        <h2 className="text-xl font-bold">Tech Services</h2>
                        <ul className="space-y-2 text-gray-300">
                            {services.map(service => (
                                <li key={service.id}>
                                    <Link href={`/services/${service.id}`} className="hover:text-white transition-colors duration-200 text-left w-full">{service.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-2 lg:col-span-3">
                        <h2 className="text-xl font-bold">Contact Support</h2>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center gap-2"><i className="fa-brands fa-whatsapp text-green-400"></i><a href={`https://wa.me/${settings.whatsapp}`} className="hover:text-white transition-colors duration-200">Whatsapp: {settings.whatsapp}</a></li>
                            <li className="flex items-center gap-2"><i className="fa-regular fa-envelope text-red-300"></i><a href={`mailto:${settings.email}`} className="hover:text-white transition-colors duration-200">{settings.email}</a></li>
                            <li className="flex items-center gap-2"><i className="fa-solid fa-tty text-blue-300"></i><a href={`tel:${settings.phone}`} className="hover:text-white transition-colors duration-200">Landline: {settings.phone}</a></li>
                        </ul>
                    </div>

                    <div className="space-y-2 lg:col-span-2">
                        <h2 className="text-xl font-bold">Our Location</h2>
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.045059635955!2d85.35246281506144!3d27.68501258280065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198d033a209d%3A0x8e5f2945a1f28e21!2sLokanthali%2C%2C%20Madhyapur%20Thimi%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1662556885835!5m2!1sen!2sus" 
                            className="w-full h-40 border-0 rounded" 
                            allowFullScreen={true} 
                            loading="lazy"
                            title="Google Map Location"
                         ></iframe>
                    </div>
                </div>

                <div className="md:flex justify-between items-center pt-5 text-center md:text-left text-gray-400">
                    <small>Copyright © {new Date().getFullYear()}. Sangalo Tech Pvt. Ltd. All rights reserved.</small>
                    <div className="mt-2 md:mt-0">
                        <small><Link href="/terms" className="hover:text-white">Terms & Conditions</Link> | </small>
                        <small><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></small>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
