import { login } from '@/app/signin/sign-in-form.helper';
import { toast } from 'sonner';
import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Provide User name' }),
    password: z
      .string()
      .min(6, { message: 'Provide password (min 6 characters)' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpCredentials = z.infer<typeof formSchema>;

export const signup = async (name: string, password: string) => {
  try {
    const res = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();

    toast.success('New User created successfully');
    const logRes = await login(name, password);
    if (logRes) return true;
  } catch (error) {
    const err = error as { message: string };
    toast.error(err.message);
  }
  return false;
};
