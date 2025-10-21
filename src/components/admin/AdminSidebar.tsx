'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const AdminSidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { href: '/admin/dashboard', icon: 'fa-tachometer-alt', label: 'Courses' },
        { href: '/admin/classes', icon: 'fa-clock', label: 'Upcoming Classes' },
        { href: '/admin/bookings', icon: 'fa-calendar-check', label: 'Bookings' },
        { href: '/admin/blogs', icon: 'fa-blog', label: 'Blogs' },
        { href: '/admin/portfolio', icon: 'fa-image', label: 'Portfolio' },
        { href: '/admin/services', icon: 'fa-cogs', label: 'Services' },
        { href: '/admin/products', icon: 'fa-box-open', label: 'Products' },
        { href: '/admin/team', icon: 'fa-users', label: 'Team' },
        { href: '/admin/jobs', icon: 'fa-briefcase', label: 'Jobs/Career' },
        { href: '/admin/student-feedback', icon: 'fa-user-graduate', label: 'Student Feedback' },
        { href: '/admin/client-feedback', icon: 'fa-handshake', label: 'Client Feedback' },
        { href: '/admin/partners', icon: 'fa-handshake', label: 'Partners' },
        { href: '/admin/contact', icon: 'fa-envelope', label: 'Contact Messages' },
        { href: '/admin/settings', icon: 'fa-cog', label: 'Site Settings' },
    ];
    
    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <Link href="/admin/dashboard">
                    <Image src="/logo-white.png" alt="SangaloTech Admin" width={150} height={37} />
                </Link>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2">
                {navItems.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                            pathname.startsWith(item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <i className={`fas ${item.icon} w-6`}></i>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="px-2 py-4 border-t border-gray-700">
                 <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                    <i className="fas fa-sign-out-alt w-6"></i>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;