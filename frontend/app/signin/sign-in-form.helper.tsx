import { setCookie } from 'cookies-next';
import { toast } from 'sonner';
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Provide User name' }),
  password: z.string().min(1, { message: 'Provide password' }),
});

export type LoginCredentials = z.infer<typeof formSchema>;

export const login = async (name: string, password: string) => {
  try {
    const res = await fetch('http://localhost:8000/auth/login', {
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
    setCookie('token', data.accessToken);
    return true;
  } catch (error) {
    const err = error as { message: string };
    toast.error(err.message);
  }
  return false;
};
