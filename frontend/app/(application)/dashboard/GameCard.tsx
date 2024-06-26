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

import { IGameDetails } from '@/app/Interfaces/IGameDetails';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { getCookie } from 'cookies-next';
import { BarChartBig, CircleX, FileDigit, Star, WholeWord } from 'lucide-react';
import { toast } from 'sonner';
import GenerateGamePdf from './GenerateGamePdf';

const GameCard = ({
  id,
  author,
  city,
  gameRules,
  participants,
  promptResponse,
  theme,
  title,
}: IGameDetails) => {
  const { loading } = useContext(AuthContext) as IAuthContext;

  const deleteGame = async () => {
    try {
      const response = await fetch(`http://localhost:8000/games/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      if (response.ok) {
        toast.success('Game deleted');
      }
    } catch (error) {
      console.error('Error deleting game', error);
    }
  };

  // If loading then show loading spinner
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
            <BarChartBig className="h-8 w-8" />
            {title}
            <Button
              onClick={deleteGame}
              size="icon"
              className="ml-auto text-red-500 bg-white hover:bg-white hover:text-red-900"
            >
              <CircleX />
            </Button>
          </CardTitle>
          <CardDescription>{city}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <span className="sr-only">Team Information</span>
          <div className="flex items-center gap-2.5 ">
            <FileDigit className="h-5 w-5" />
            <p className="font-bold">Game Number </p>
          </div>
          <p className="pb-3">{id}</p>
          <div className="flex items-center gap-2.5">
            <Star className="h-5 w-5" />
            <p className="font-bold">Game Theme</p>
          </div>
          <p className="pb-3">{theme}</p>
          <div className="flex items-center gap-2.5 pb-1">
            <WholeWord className="h-5 w-5" />
            <p className="font-bold">Game Rules</p>
          </div>
          <ScrollArea className="pt-2 h-[100px] w-full rounded-md border-l px-2">
            {gameRules}
          </ScrollArea>
        </CardContent>
        <CardFooter className="mt-auto">
          <GenerateGamePdf
            id={id}
            city={city}
            promptResponse={promptResponse}
            gameRules={gameRules}
            participants={participants}
            theme={theme}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default GameCard;
