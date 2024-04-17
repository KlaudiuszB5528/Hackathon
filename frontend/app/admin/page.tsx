'use client';

import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { AuthContext } from '@/app/context/AuthContext';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import UsersTable from './UsersTable';

const AdminDashboard = () => {
  const { userData } = useContext(AuthContext) as IAuthContext;
  if (!userData || userData.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h2 className="mx-auto my-6 font-bold text-2xl">Admin Dashboard</h2>
      <UsersTable />
    </div>
  );
};

export default AdminDashboard;
