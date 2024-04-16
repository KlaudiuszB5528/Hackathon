import { login } from '@/app/signin/sign-in-form.helper';
import { getCookie } from 'cookies-next';
import { toast } from 'sonner';
import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Provide User name' }),
    password: z.string().min(6, { message: 'Provide password (min 6 characters)' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password' }),
    description: z.string().min(1, { message: 'Provide team description' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpCredentials = z.infer<typeof formSchema>;

export const addMember = async ({
  name,
  email,
  teamId,
}: {
  name: string;
  email: string;
  teamId: number;
}) => {
  try {
    const res = await fetch('http://localhost:8000/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify({ name, email, teamId }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    return true;
  } catch (error) {
    const err = error as { message: string };
    toast.error(err.message);
  }
};

export const signup = async (
  name: string,
  password: string,
) => {
  try {
    const res = await fetch('http://localhost:8000/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();

    toast.success('New User successfully');
    const logRes = await login(name, password);
    if (logRes) return true;
  } catch (error) {
    const err = error as { message: string };
    toast.error(err.message);
  }
  return false;
};
