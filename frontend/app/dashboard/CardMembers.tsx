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
import { UserRound, Users } from 'lucide-react';
import Link from 'next/link';

const CardMembers = () => {
  const { teamData, teamDataLoading, teamMembers } = useContext(
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
            <Users className="h-8 w-8" />
            Members
          </CardTitle>
          <CardDescription>Overview of your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="sr-only">Team Members Information</span>
          {teamMembers?.map((member) => (
            <div key={member.id} className="flex items-center gap-2.5 pb-2">
              <UserRound className="h-5 w-5" />
              <p className="font-semibold">{member.name}</p>
              <p>{member.email}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button asChild className="bg-fuchsia-700">
            <Link href="/dashboard/members">Edit Members</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardMembers;
