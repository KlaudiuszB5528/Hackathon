'use client';

import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { IAuthContext } from '../Interfaces/IAuthContext';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { userData } = useContext(AuthContext) as IAuthContext;
  if (userData?.role === 'admin') redirect('/admin');
  return (
    <div className="w-full h-full p-4 sm:p-10 m-auto space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-4 xl:grid-cols-3 max-w-screen-2xl">
      Dashboard
    </div>
  );
};

export default Dashboard;
