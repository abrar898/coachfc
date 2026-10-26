import React, { Suspense } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export const metadata = {
  title: 'Club Dashboard | Coach FC Administration & Match Operations',
  description: 'Secure management portal for Coach FC coaches, analysts, and directors.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#080B12] text-[#F5F7FA] overflow-hidden">
      {/* Collapsible Sidebar inside Suspense */}
      <Suspense fallback={<div className="w-64 bg-[#080B12] border-r border-[#283141] shrink-0" />}>
        <DashboardSidebar />
      </Suspense>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <Suspense fallback={<div className="p-8 text-[#929BA9]">Loading Operations...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
