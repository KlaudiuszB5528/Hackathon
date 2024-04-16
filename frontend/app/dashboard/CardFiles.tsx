'use client';

import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { AuthContext } from '@/app/context/AuthContext';
import { useContext } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Package } from 'lucide-react';
import Link from 'next/link';

const CardMembers = () => {
  const { teamDataLoading, teamFiles } = useContext(
    AuthContext,
  ) as IAuthContext;
  // If loading then show loading spinner
  if (teamDataLoading) {
    return (
      <div className="flex flex-col space-y-6 w-full p-6 border border-gray-200 rounded-lg">
        <Skeleton className="h-8 w-1/2 rounded-xl " />
        <Skeleton className="h-4 w-[250px] rounded-xl" />

        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-[175px] rounded-xl" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-[175px] rounded-xl" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-[175px] rounded-xl" />
        </div>
        <Skeleton className="mt-4 h-10 w-[200px] rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="border-b border-gray-200 mb-2">
          <CardTitle className="flex gap-2 items-center">
            <Package className="h-8 w-8" />
            Files
          </CardTitle>
          <CardDescription>Summary of your team files</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="sr-only">Team Members Information</span>
          {teamFiles?.length === 0 && (
            <p className="font-semibold">No files uploaded yet</p>
          )}
          {teamFiles?.map((file) => {
            const formattedDate = new Date(file.createdAt).toLocaleDateString(
              'pl-PL',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              },
            );
            return (
              <ul
                key={file.id}
                className="flex flex-col items-start gap-1 py-2 w-full border-gray-50 flex-wrap"
              >
                <li className="flex flex-row gap-2">
                  <FileText className="h-5 w-5" />
                  <p className="font-semibold">{file.name}</p>
                </li>
                <li>{(file.size / 1024).toFixed(2)} kB</li>
                <li>{formattedDate}</li>
              </ul>
            );
          })}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button asChild className="bg-fuchsia-700">
            <Link href="/dashboard/files">Manage Files</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardMembers;
