'use client';

import { getCookie } from 'cookies-next';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  const router = useRouter();
  const token = getCookie('token');
  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [router, token]);

  if (token) return null;

  return <SignUpForm />;
}
