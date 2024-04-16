'use client';
import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { AuthContext } from '@/app/context/AuthContext';
import { useContext } from 'react';
import MembersForm from './MembersForm';

export default function Page() {
  const { teamMembers } = useContext(AuthContext) as IAuthContext;
  return <MembersForm />;
}
