'use client';

import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { AuthContext } from '@/app/context/AuthContext';
import { useContext } from 'react';
import UsersTable from './UsersTable';

const AdminDashboard = () => {
  const { userData } = useContext(AuthContext) as IAuthContext;
  //   if (!userData || userData.role !== 'admin') {
  //     redirect('/dashboard');
  //     return <div>Unauthorized</div>;
  //   }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="mx-auto">Admin Dashboard</div>
      <UsersTable />
    </div>
  );
};

export default AdminDashboard;
