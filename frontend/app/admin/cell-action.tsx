'use client';
import { getCookie } from 'cookies-next';
import { Loader, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

export default function CellAction({
  setShouldUpdate,
  id,
}: {
  setShouldUpdate: Dispatch<SetStateAction<boolean>>;
  id: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      if (response.status === 200) {
        toast.success('User deleted');
        setShouldUpdate(true);
      }
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader className="animate-spin" />
  ) : (
    <Trash2
      className="hover:text-red-500 cursor-pointer"
      onClick={handleDelete}
    />
  );
}
