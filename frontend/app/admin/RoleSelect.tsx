import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCookie } from 'cookies-next';
import { Check, Loader } from 'lucide-react';

import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

export const RoleSelect = ({
  userRole,
  userId,
  setShouldUpdate,
}: {
  userRole: string;
  userId: number;
  setShouldUpdate: Dispatch<SetStateAction<boolean>>;
}) => {
  const [role, setRole] = useState<string>(userRole);
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/users/role/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`,
          },
          body: JSON.stringify({ role }),
        },
      );
      if (response.status === 200) {
        toast.success('Role updated');
        setShouldUpdate(true);
      }
    } catch (error) {
      toast.error('Failed to update role');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-4 items-center">
      <Select
        defaultValue={userRole}
        onValueChange={(value: string) => {
          setRole(value);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['user', 'masterUser'].map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {role !== userRole &&
        (loading ? (
          <Loader className="animate-spin" />
        ) : (
          <Check onClick={handleUpdate} className="cursor-pointer" />
        ))}
    </div>
  );
};
