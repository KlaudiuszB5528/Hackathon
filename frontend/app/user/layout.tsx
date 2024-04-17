import { AuthContextProvider } from '@/app/context/AuthContext';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <Sidebar />
      <Header />
      <section id="MainContent" className="sm:pl-14 flex">
        {children}
      </section>
    </AuthContextProvider>
  );
}
