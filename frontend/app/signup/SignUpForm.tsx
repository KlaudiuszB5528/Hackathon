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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import signUpImg from 'public/signup.svg';
import { useForm } from 'react-hook-form';
import {
  formSchema,
  signup,
  type SignUpCredentials,
} from './sign-up-form.helper';
export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpCredentials>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async () => {
          const res = await signup(
            form.getValues('name'),
            form.getValues('password'),
          );

          if (res) router.push('/dashboard');
        })}
        className="w-full lg:grid lg:grid-cols-2"
      >
        <ScrollArea className="h-screen">
          <div className="flex items-center h-full justify-center py-12 ">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-balance text-muted-foreground">
                  You need to sign up to access the platform
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User name</FormLabel>
                        <FormControl>
                          <Input placeholder="eg. Andrew Kowalski" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
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
                  Add new user
                </Button>
              </div>
            </div>
          </div>
          </div>
        </ScrollArea>
        <div className="hidden bg-muted lg:block h-screen">
          <Image
            src={signUpImg}
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </form>
    </Form>
  );
}
