import React from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/types';

interface TopHeaderProps {
  settings: SiteSettings;
}

const TopHeader: React.FC<TopHeaderProps> = ({ settings }) => {
  return (
    <header className="shadow-md"><div className="bg-[#004a61] text-white text-sm"><div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 p-2"><div className="flex flex-wrap justify-center space-x-6"><a href={`tel:${settings.phone}`} className="hover:text-[#f8a899] transition"><i className="fas fa-phone-alt mr-1"></i> {settings.phone}
            </a><a href={`https://wa.me/${settings.whatsapp}`} className="hover:text-[#f8a899] transition" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp mr-1"></i> {settings.whatsapp}
            </a><a href={`mailto:${settings.email}`} className="hover:text-[#f8a899] transition hidden md:block"><i className="fas fa-envelope mr-1"></i> {settings.email}
            </a></div><div className="flex items-center space-x-4"><div className="flex space-x-4"><a target="_blank" href={settings.socials.facebook} className="relative group hover:text-[#f8a899] transition" aria-label="Facebook" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i><span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Facebook
                </span></a><a target="_blank" href={settings.socials.youtube} className="relative group hover:text-[#f8a899] transition" aria-label="YouTube" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i><span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  YouTube
                </span></a><a target="_blank" href={settings.socials.linkedin} className="relative group hover:text-[#f8a899] transition" aria-label="LinkedIn" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i><span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  LinkedIn
                </span></a><a target="_blank" href={settings.socials.instagram} className="relative group hover:text-[#f8a899] transition" aria-label="Instagram" rel="noopener noreferrer"><i className="fab fa-instagram"></i><span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Instagram
                </span></a></div></div></div></div></header>
  );
};

export default TopHeader;
