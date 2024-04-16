'use client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';

import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { AuthContext } from '@/app/context/AuthContext';
import TooltipComponent from '@/components/TooltipComponent';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteCookie } from 'cookies-next';
import { Loader, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  deleteTeam,
  formSchema,
  updateTeam,
  type SettingsFormValues,
} from './settings-form.helper';
export default function SettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setShouldUpdate } = useContext(AuthContext) as IAuthContext;
  const router = useRouter();
  const { teamData } = useContext(AuthContext) as IAuthContext;
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: teamData?.name ?? '',
      description: teamData?.description ?? '',
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async () => {
          setIsSubmitting(true);
          const res = await updateTeam({
            name: form.getValues('name'),
            description: form.getValues('description'),
            teamId: teamData?.id ?? null,
          });
          if (res) {
            toast.success('Successfully updated team');
            setShouldUpdate(true);
            setIsSubmitting(false);
          }
        })}
        className="w-full"
      >
        <div className="flex items-center h-full justify-center py-12 ">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Update your Team</h1>
              <TooltipComponent
                asChild
                trigger={
                  <Trash2
                    size={30}
                    className="hover:text-red-500"
                    onClick={async () => {
                      deleteTeam(teamData?.id ?? null);
                      deleteCookie('token');
                      history.pushState({}, '', '/');
                      router.push('/');
                      toast.success('Successfully deleted team');
                    }}
                  />
                }
                content={<p>Delete team</p>}
              />
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="resize-none" rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={
                  (teamData?.name === form.getValues('name') &&
                    teamData?.description === form.getValues('description')) ||
                  isSubmitting
                }
                className="my-6 bg-fuchsia-700 hover:bg-fuchsia-800"
              >
                {isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  'Update team'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
