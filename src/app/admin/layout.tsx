'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  // Do not show the admin sidebar on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}