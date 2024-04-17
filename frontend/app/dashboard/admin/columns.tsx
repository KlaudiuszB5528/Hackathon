'use client';

import { IUser } from '@/app/Interfaces/IUser';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { RoleSelect } from './RoleSelect';
import CellAction from './cell-action';

export const columns = (
  setShouldUpdate: Dispatch<SetStateAction<boolean>>,
): ColumnDef<IUser>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      header: 'Role',
      cell: ({ row }) => {
        return (
          <RoleSelect
            userRole={row.original.role}
            userId={row.original.id}
            setShouldUpdate={setShouldUpdate}
          />
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction setShouldUpdate={setShouldUpdate} id={row.original.id} />
      ),
    },
  ];
};
