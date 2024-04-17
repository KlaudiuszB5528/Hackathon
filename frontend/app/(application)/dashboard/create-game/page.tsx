'use client';
import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { AuthContext } from '@/app/context/AuthContext';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import CreateGameForm from './CreateGameForm';

export default function Page() {
  const { userData } = useContext(AuthContext) as IAuthContext;
  if (!userData || userData.role !== 'masterUser') {
    redirect('/dashboard');
  }
  return (
    <div className={'flex w-full flex-col items-center'}>
      <CreateGameForm />
    </div>
  );
}
