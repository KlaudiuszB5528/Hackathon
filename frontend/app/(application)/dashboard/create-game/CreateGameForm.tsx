'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { getCenterLatLng } from '@/lib/utils';
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
import { LatLng } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { toast } from 'sonner';
import SaveGameButton from './SaveGameButton';
import ThemeSelect from './ThemeSelect';
import {
  formSchema,
  type CreateGameFormValues,
} from './create-game-form.helper';
import { createPdf } from './generatePdf';

export default function CreateGameForm() {
  const [gameDetails, setGameDetails] = useState<string | null>(null);
  const [jsonGameDetails, setJsonGameDetails] = useState<any>(null); //
  const [gameRules, setGameRules] = useState<string>('');
  const [points, setPoints] = useState<LatLng[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<CreateGameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
      participants: '2',
      theme: '',
      points: '4',
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async () => {
            setIsGenerating(true);
            try {
              const res = await generateGame({
                city: form.getValues('city'),
                participants: form.getValues('participants'),
                points: form.getValues('points'),
                theme: form.getValues('theme'),
              });
              if (res) {
                if (!res.choices[0].message.content) return;
                const gameDetails = JSON.parse(res.choices[0].message.content);
                setJsonGameDetails(gameDetails);
                setGameDetails(res.choices[0].message.content);
                setGameRules(gameDetails.gameRules);
                const points = gameDetails.points.map(
                  (point: { name: string; coordinates: string }) => {
                    const [lat, lng] = point.coordinates
                      .split(',')
                      .map((c) => parseFloat(c));
                    return new LatLng(lat, lng);
                  },
                );
                setPoints(points);
                toast.success('Game generated successfully');
              }
            } catch (error) {
              toast.error('Failed to create PDF');
            } finally {
              setIsGenerating(false);
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
                  <div className="flex items-center gap-2 justify-between">
                    <Button
                      disabled={isGenerating}
                      className="bg-fuchsia-700 hover:bg-fuchsia-800 w-32"
                    >
                      {isGenerating ? (
                        <Loader className="animate-spin" />
                      ) : (
                        'Generate Game'
                      )}
                    </Button>
                    <Button
                      disabled={gameDetails === null || isSaving}
                      type="button"
                      className="w-32"
                      onClick={async () => {
                        if (gameDetails === null) return;
                        setIsSaving(true);
                        try {
                          const res = await createPdf(gameDetails, gameRules);
                          if (res) {
                            toast.success('PDF saved successfully');
                          }
                        } catch (error) {
                          toast.error('Failed to create PDF');
                        } finally {
                          setIsSaving(false);
                        }
                      }}
                    >
                      {isSaving ? (
                        <Loader className="animate-spin" />
                      ) : (
                        'Save to PDF'
                      )}
                    </Button>
                    <SaveGameButton
                      disabled={gameRules === ''}
                      title="Game"
                      participants={jsonGameDetails?.participants}
                      gameRules={gameRules}
                      city={jsonGameDetails?.city}
                      promptResponse={gameDetails || 'Error loading prompt'}
                      theme={jsonGameDetails?.theme}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </form>
      </Form>
      {gameDetails && (
        <MapContainer
          id="map"
          className="w-[500px] h-[500px]"
          center={getCenterLatLng(points)}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map((point) => {
            return <Marker position={point} key={point.toString()} />;
          })}
        </MapContainer>
      )}
    </>
  );
}
