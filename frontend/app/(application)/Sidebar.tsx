'use client';

import Logo from '@/public/Logo.svg';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

import { Home, LogOut, Plus, Shield } from 'lucide-react';
import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { IAuthContext } from '../Interfaces/IAuthContext';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { userData } = useContext(AuthContext) as IAuthContext;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <div className="w-full h-[57px] border-b flex border-border justify-center items-center">
        <span className="cursor-default group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <Image
            src={Logo}
            alt="logo decorative element"
            className="h-12 w-12 transition-all"
          />
          <span className="sr-only">FieldGamezone</span>
        </span>
      </div>
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {userData?.role === 'admin' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin"
                  className={`${
                    pathname == '/admin' && 'bg-accent text-primary'
                  } flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Shield className="h-5 w-5" />
                  <span className="sr-only">Admin Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Admin Dashboard</TooltipContent>
            </Tooltip>
          )}
          {userData?.role !== 'admin' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`${
                    userData?.role === 'masterUser' ? '/dashboard' : '/user'
                  }`}
                  className={`${
                    pathname == '/dashboard' ||
                    (pathname == '/user' && 'bg-accent text-primary')
                  } flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          )}
          {userData?.role === 'masterUser' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/create-game"
                  className={`${
                    pathname == '/dashboard/create-game' &&
                    'bg-accent text-primary'
                  } flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Create game</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Create game</TooltipContent>
            </Tooltip>
          )}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  deleteCookie('token');
                  history.pushState({}, '', '/');
                  router.push('/');
                  toast.success('Successfully logged out');
                }}
                className={`${
                  pathname == '/logout' && 'bg-accent text-primary'
                } flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log Out</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Log Out</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
