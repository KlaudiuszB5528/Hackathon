'use client';

import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Star, UserRound } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ITeamData } from '../Interfaces/ITeamData';
import { ITeamMember } from '../Interfaces/ITeamMember';

interface Props {
  loading?: boolean;
  teamMembers?: ITeamMember[];
  teamData?: ITeamData;
}

const TeamCard = ({ loading, teamMembers, teamData }: Props) => {
  if (loading) {
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
            <Star className="h-8 w-8" />
            Team {teamData?.id} - {teamData?.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {teamData?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <span className="sr-only">Team Members Information</span>
          {teamMembers?.map((member) => (
            <div key={member.id} className="flex items-center gap-2.5 pb-2">
              <UserRound className="h-5 w-5" />
              <p className="font-semibold">{member.name}</p>
              <p>{member.email}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default TeamCard;
