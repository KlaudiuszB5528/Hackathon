import { getCookie } from 'cookies-next';
import { toast } from 'sonner';
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Provide team name' }),
  description: z.string().min(1, { message: 'Provide team description' }),
});

export type SettingsFormValues = z.infer<typeof formSchema>;

export const updateTeam = async ({
  name,
  description,
  teamId,
}: {
  name: string;
  description: string;
  teamId: number | null;
}) => {
  if (!teamId) return;
  try {
    const res = await fetch(`http://localhost:8000/teams/${teamId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify({ name, description }),
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

export const deleteTeam = async (teamId: number | null) => {
  if (!teamId) return;
  try {
    const res = await fetch(`http://localhost:8000/teams/${teamId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
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
  return false;
};
