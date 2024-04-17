'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateGame } from '@/open-ai/ai';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import ThemeSelect from './ThemeSelect';
import {
  formSchema,
  type CreateGameFormValues,
} from './create-game-form.helper';
import { createPdf } from './generatePdf';
import SaveGameButton from './SaveGameButton';

export default function CreateGameForm() {
  const [gameDetails, setGameDetails] = useState<string | null>(null);
  const [jsonGameDetails, setJsonGameDetails] = useState<any>(null);
  const [gameRules, setGameRules] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CreateGameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
      participants: '2',
      theme: '',
      points: '4',
    },
  });

  useEffect(() => {
    if (gameDetails === null) return;
    setJsonGameDetails(JSON.parse(gameDetails));
    setGameRules(JSON.parse(gameDetails).gameRules);
  }, [gameDetails]);
  console.log(gameDetails);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async () => {
          setIsLoading(true);
          try {
            const res = await generateGame({
              city: form.getValues('city'),
              participants: form.getValues('participants'),
              points: form.getValues('points'),
              theme: form.getValues('theme'),
            });
            if (res) {
              setGameDetails(res.choices[0].message.content);
              toast.success('Game generated successfully');
            }
          } catch (error) {
            toast.error('Failed to create PDF');
          } finally {
            setIsLoading(false);
          }
        })}
        className="w-full"
      >
        <ScrollArea className="h-screen">
          <div className="flex items-center justify-center py-12 ">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Create New Game</h1>
                <p className="text-balance text-muted-foreground">
                  Fill the form to create a new game
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="eg. Kielce" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <FormControl>
                          <ThemeSelect />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participants</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of control points</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormLabel
                    className={`${
                      gameRules === ''
                        ? 'text-muted-foreground'
                        : 'text-primary-foreground'
                    }`}
                  >
                    Edit game rules
                  </FormLabel>
                  <Textarea
                    disabled={gameRules === ''}
                    value={gameRules}
                    onChange={(e) => setGameRules(e.target.value)}
                    placeholder="You can edit game rules after generating the game"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button className="bg-fuchsia-700 hover:bg-fuchsia-800 w-32">
                    {isLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      'Create PDF'
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (gameDetails === null) return;
                      createPdf(gameDetails, gameRules);
                    }}
                  >
                    Save to PDF
                  </Button>
                  <SaveGameButton
                    disabled={gameRules === ''}
                    title="Game"
                    participants={jsonGameDetails?.participants}
                    gameRules={gameRules}
                    city={jsonGameDetails?.city}
                    promptResponse={jsonGameDetails?.promptResponse}
                    theme={jsonGameDetails?.theme}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}
