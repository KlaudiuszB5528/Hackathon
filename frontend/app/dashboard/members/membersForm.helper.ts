import { getCookie } from 'cookies-next';
import { toast } from 'sonner';
import { z } from 'zod';

export const formSchema = z
  .object({
    members: z.array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, {
          message: 'Provide member full name',
        }),
        email: z.string().email({
          message: 'Provide valid email address',
        }),
      }),
    ),
  })
  .refine((data) => data.members.length > 0, {
    message: 'Provide at least one member',
    path: ['members'],
  });

export type MembersFormValues = z.infer<typeof formSchema>;

export const deleteMember = async ({ id }: { id?: number }) => {
  if (!id) return;
  try {
    const res = await fetch(`http://localhost:8000/members/${id}`, {
      method: 'DELETE',
      headers: {
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
};

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

export const updateMembers = async (
  membersToRemove: { name: string; email: string; id?: number }[],
  members: { name: string; email: string }[],
  teamId: number | null,
) => {
  if (!teamId) return;
  try {
    await Promise.all(
      members.map((member) =>
        addMember({
          name: member.name,
          email: member.email,
          teamId,
        }),
      ),
    );
    await Promise.all(
      membersToRemove.map((member) => deleteMember({ id: member?.id })),
    );
    return true;
  } catch (error) {
    throw new Error('Failed to create team members');
  }
};
