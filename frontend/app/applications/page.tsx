'use client';
import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Applications = () => {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/teams/all`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
          setLoading(false);
        }
      } catch (error) {
        toast.error('Failed to fetch teams');
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full flex flex-col max-w-screen-md m-auto py-12 px-5 gap-5">
      <h1 className="text-3xl font-bold text-fuchsia-700">Applications</h1>
      <div className="flex gap-4 items-center">
        <Button asChild className="bg-fuchsia-700 w-fit transition-all ">
          <Link href="/signup">Create a new team</Link>
        </Button>
        <Button
          asChild
          className="bg-white text-fuchsia-700 border transition-all hover:bg-fuchsia-700 hover:text-white w-fit "
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
      {teams.map((team: any) => (
        <TeamCard
          key={team.id}
          teamData={team}
          loading={loading}
          teamMembers={team.members}
        />
      ))}
    </section>
  );
};

export default Applications;
