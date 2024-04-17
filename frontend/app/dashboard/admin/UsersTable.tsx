'use client';
import { IUser } from '@/app/Interfaces/IUser';
import { DataTable } from '@/components/ui/data-table';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { columns } from './columns';

export default function UsersTable() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:8000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    };
    if (shouldUpdate) {
      fetchUsers();
      setShouldUpdate(false);
      return;
    }
    fetchUsers();
  }, [shouldUpdate]);
  const tableColumns = columns(setShouldUpdate);

  return <DataTable searchKey="username" columns={tableColumns} data={users} />;
}
