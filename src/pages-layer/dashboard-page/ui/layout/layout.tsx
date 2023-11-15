import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';
import type { FC, ReactNode } from 'react';

interface DashboardPageLayoutProps {
  children: ReactNode;
}

export const DashboardPageLayout: FC<DashboardPageLayoutProps> = ({ children }) => {
  return (
    <div className="h-full relative">
      <section className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80px] bg-gray-900">
        <Sidebar />
      </section>
      <main className="md:pl-72">
        <Navbar sheetContent={<Sidebar />} />
        {children}
      </main>
    </div>
  );
};
