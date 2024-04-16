'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@components/ui/button';
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ThemeSelect from './ThemeSelect';
import {
  formSchema,
  type CreateGameFormValues,
} from './create-game-form.helper';
export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<CreateGameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
      participants: 2,
      theme: '',
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          console.log(form.getValues());
        })}
        className="w-full"
      >
        <ScrollArea className="h-screen">
          <div className="flex items-center h-full justify-center py-12 ">
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

                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    className="my-6 bg-fuchsia-700 hover:bg-fuchsia-800"
                  >
                    Create Game
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}
