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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChartBig, FileDigit, Star, WholeWord } from 'lucide-react';
import Link from 'next/link';

const CardWelcome = () => {
  const { teamData, teamDataLoading } = useContext(AuthContext) as IAuthContext;
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
            <BarChartBig className="h-8 w-8" />
            Overview
          </CardTitle>
          <CardDescription>Review your team information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <span className="sr-only">Team Information</span>
          <div className="flex items-center gap-2.5 ">
            <FileDigit className="h-5 w-5" />
            <p className="font-bold">Team Number</p>
          </div>
          <p className="pb-3">{teamData?.id}</p>
          <div className="flex items-center gap-2.5">
            <Star className="h-5 w-5" />
            <p className="font-bold">Team Name</p>
          </div>
          <p className="pb-3">{teamData?.name}</p>
          <div className="flex items-center gap-2.5 pb-1">
            <WholeWord className="h-5 w-5" />
            <p className="font-bold">Team Description</p>
          </div>
          <ScrollArea className="pt-2 h-[100px] w-full rounded-md border-l px-2">
            {teamData?.description}
          </ScrollArea>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button asChild className="bg-fuchsia-700">
            <Link href="/dashboard/settings">Update Team Information</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardWelcome;
