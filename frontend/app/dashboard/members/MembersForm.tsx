'use client';
import TooltipComponent from '@/components/TooltipComponent';
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
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useContext, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  MembersFormValues,
  formSchema,
  updateMembers,
} from './membersForm.helper';
export default function MembersForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { teamMembers, teamData, setShouldUpdate } = useContext(
    AuthContext,
  ) as IAuthContext;
  const form = useForm<MembersFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: teamMembers as MembersFormValues['members'],
    },
  });
  const members = useFieldArray({
    control: form.control,
    name: 'members',
  });

  const formMembers = form.getValues('members');

  const areMembersEqual =
    teamMembers?.every((member) =>
      formMembers.some(
        (newMember) =>
          member.email === newMember.email && member.name === newMember.name,
      ),
    ) &&
    formMembers.every((newMember) =>
      teamMembers?.some(
        (member) =>
          member.email === newMember.email && member.name === newMember.name,
      ),
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async () => {
          const newMembers = form.getValues('members').filter((member) => {
            return !teamMembers?.some(
              (oldMember) =>
                oldMember.email === member.email &&
                oldMember.name === member.name,
            );
          });
          const membersToRemove = teamMembers?.filter((member) => {
            return !form
              .getValues('members')
              .some(
                (oldMember) =>
                  member.email === oldMember.email &&
                  member.name === oldMember.name,
              );
          });
          console.log('membersToRemove', membersToRemove);
          setIsSubmitting(true);
          const res = await updateMembers(
            membersToRemove as { name: string; email: string; id?: number }[],
            newMembers,
            teamData?.id ?? null,
          );
          if (res) {
            toast.success('Successfully updated team members');
            setShouldUpdate(true);
            setIsSubmitting(false);
          }
        })}
        className="w-full px-12 py-6 lg:p-4"
      >
        <div className="mx-auto grid max-w-3xl gap-8">
          <div className="grid gap-6">
            <div className="flex items-center justify-between text-2xl">
              <span className="font-bold">Team members</span>
              {form.formState.errors.members !== undefined && (
                <span className="text-red-600">
                  {form.formState.errors.members.message}
                </span>
              )}
              {members.fields.length < 4 && (
                <TooltipComponent
                  asChild
                  trigger={
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-3xl"
                      onClick={() => {
                        members.append(
                          { name: '', email: '' },
                          { shouldFocus: true },
                        );
                      }}
                    >
                      +
                    </Button>
                  }
                  content={<p>Add a team member</p>}
                />
              )}
            </div>
            <div className="grid lg:grid-cols-2 gap-y-8 gap-x-12">
              {members.fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <h3 className="flex justify-between items-center">
                      <span>{`${index + 1}.`}</span>
                      <TooltipComponent
                        asChild
                        trigger={
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-xl"
                            onClick={() => {
                              members.remove(index);
                            }}
                          >
                            -
                          </Button>
                        }
                        content={<p>Remove a team member</p>}
                      />
                    </h3>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name={`members.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
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
                        name={`members.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || areMembersEqual}
              className="my-6 bg-fuchsia-700 hover:bg-fuchsia-800"
            >
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                'Update team members'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
