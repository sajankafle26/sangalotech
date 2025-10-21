'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import type { TechService, Course, Product, SiteSettings } from '@/types';

const NavDropdown: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
  <div className="relative group"><button className="flex items-center gap-1 hover:text-[var(--red)] font-medium transition-all duration-300 transform hover:-translate-y-0.5 px-3 py-1.5 rounded-md">
      {title}
      <i className="fa-solid fa-chevron-down text-xs"></i></button><div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      {children}
    </div></div>
);

const MobileAccordion: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200"><button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-3 px-3 text-sm sm:text-base font-medium text-gray-700 hover:text-[var(--red)]"
                aria-expanded={isOpen}
            >
                <span>{title}</span><i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}><div className="pt-2 pb-3 pl-6 flex flex-col gap-2 bg-gray-50">
                    {children}
                </div></div></div>
    );
};


const Navbar: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for dynamic dropdown data
  const [techServices, setTechServices] = useState<TechService[]>([]);
  const [jobReadyCourses, setJobReadyCourses] = useState<Course[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch all necessary data for the navbar dropdowns in parallel
    async function fetchNavbarData() {
        try {
            const [servicesRes, coursesRes, productsRes] = await Promise.all([
                fetch('/api/services'),
                fetch('/api/courses?category=js'), // Fetch JS courses for the Job-Ready program
                fetch('/api/products')
            ]);

            if (servicesRes.ok) setTechServices(await servicesRes.json());
            if (coursesRes.ok) setJobReadyCourses(await coursesRes.json());
            if (productsRes.ok) setProducts(await productsRes.json());
        } catch (error) {
            console.error("Failed to fetch navbar data:", error);
        }
    }
    fetchNavbarData();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };
  
  return (
    <section className="bg-white shadow-md z-20 py-3 sticky top-0 md:px-0 px-3"><nav className="max-w-[1200px] mx-auto"><div className="flex items-center justify-between gap-2 xl:gap-6"><Link href="/" className="flex-shrink-0"><Image
              src={settings.logoUrl}
              alt="SangaloTech Logo"
              width={200}
              height={50}
              priority
            /></Link><div className="hidden lg:flex items-center gap-1 text-[14px]"><NavDropdown title="Job-Ready Training"><Link href="/job-ready" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[var(--red)]">Program Overview</Link>
                {jobReadyCourses.map(course => (
                    <Link key={course.id} href={`/courses/${course.id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[var(--red)]">{course.title}</Link>
                ))}
            </NavDropdown><Link href="/upcoming-classes" className="hover:text-[var(--red)] relative font-medium px-3 py-1.5 transition-all duration-300 transform hover:-translate-y-0.5">
              Upcoming Classes
            </Link><NavDropdown title="Services">
              {techServices.map(service => (
                <Link key={service.id} href={`/services/${service.id}`} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[var(--red)]">{service.title}</Link>
              ))}
            </NavDropdown><NavDropdown title="Products">
                {products.map(item => (
                    <Link key={item.id} href="/#products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[var(--red)]">{item.title}</Link>
                ))}
            </NavDropdown><Link href="/portfolio" className="hover:text-[var(--red)] font-medium px-3 py-1.5 transition-all duration-300 transform hover:-translate-y-0.5">Portfolio</Link><Link href="/about" className="hover:text-[var(--red)] font-medium px-3 py-1.5 transition-all duration-300 transform hover:-translate-y-0.5">Company</Link><Link href="/contact" className="hover:text-[var(--red)] font-medium px-3 py-1.5 transition-all duration-300 transform hover:-translate-y-0.5">Contact</Link></div><div className="flex items-center gap-2"><div ref={searchRef} className="relative hidden md:flex items-center"><form onSubmit={handleSearchSubmit}><input 
                      type="text"
                      ref={input => input && isSearchOpen && input.focus()}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search courses..." 
                      className={`border rounded-md text-sm py-1.5 pr-10 pl-3 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0 border-transparent'}`}
                    />
                     <button type="submit" aria-label="Submit search" className={`absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-red-500 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}><i className="fa-solid fa-search"></i></button></form><button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="text-gray-700 text-xl p-2 hover:text-red-500 focus:outline-none"
                    aria-label="Toggle search bar"
                >
                    <i className={`fa-solid ${isSearchOpen ? 'fa-times' : 'fa-search'}`}></i></button></div><Link href="/student-portal" className="hidden lg:flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 bg-red-500 hover:bg-red-600 transform hover:-translate-y-0.5 shadow-md"><i className="fa-regular fa-user"></i></Link><button id="menu-toggle" aria-label="Toggle mobile menu" className="lg:hidden text-gray-700 text-2xl focus:outline-none hover:text-red-500 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className={isMobileMenuOpen ? "fa-solid fa-times" : "fa-solid fa-bars"}></i></button></div></div>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-gray-200 py-4 mt-3"><div className="flex flex-col"><form onSubmit={handleSearchSubmit} className="relative m-3"><input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." 
                  className="border rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                />
                <button type="submit" aria-label="Submit search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"><i className="fa-solid fa-search"></i></button></form><Link href="/" className="block px-3 py-3 text-sm sm:text-base hover:text-[var(--red)] font-bold border-b border-gray-200">Home</Link><MobileAccordion title="Job-Ready Training"><Link href="/job-ready" className="text-gray-600 hover:text-[var(--red)] text-sm text-left w-full">Program Overview</Link>
                    {jobReadyCourses.map((course) => (
                        <Link key={course.id} href={`/courses/${course.id}`} className="text-gray-600 hover:text-[var(--red)] text-sm">{course.title}</Link>
                    ))}
                </MobileAccordion><Link href="/upcoming-classes" className="block text-left px-3 py-3 text-sm sm:text-base hover:text-[var(--red)] font-medium border-b border-gray-200 relative">
                Upcoming Classes
              </Link><MobileAccordion title="Tech Services">
                 {techServices.map((service) => (
                    <Link key={service.id} href={`/services/${service.id}`} className="text-gray-600 hover:text-[var(--red)] text-sm text-left w-full">{service.title}</Link>
                 ))}
              </MobileAccordion><MobileAccordion title="Products">
                 {products.map((item) => (
                    <Link key={item.id} href="/#products" className="text-gray-600 hover:text-[var(--red)] text-sm">{item.title}</Link>
                 ))}
              </MobileAccordion><Link href="/portfolio" className="block px-3 py-3 text-sm sm:text-base hover:text-[var(--red)] font-medium border-b border-gray-200">Portfolio</Link><Link href="/about" className="block px-3 py-3 text-sm sm:text-base hover:text-[var(--red)] font-medium border-b border-gray-200">About Us</Link><Link href="/contact" className="block px-3 py-3 text-sm sm:text-base hover:text-[var(--red)] font-medium">Contact Us</Link><div className="mt-4 px-3"><Link href="/student-portal" className="block w-full text-center bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md">
                    Student Portal
                </Link></div></div></div>
        )}
      </nav></section>
  );
};

export default Navbar;
