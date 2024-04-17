import { AuthContextProvider } from '@/app/context/AuthContext';
import React from 'react';
import Header from '../dashboard/Header';
import Sidebar from '../dashboard/Sidebar';

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
