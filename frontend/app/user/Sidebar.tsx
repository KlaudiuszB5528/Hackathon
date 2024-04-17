'use client';

import React from 'react';
import Logo from '@/public/Logo.svg';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

import Link from 'next/link';
import { Home, LogOut, Plus, Settings } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

const Sidebar = () => {
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
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={`${
                  pathname == '/dashboard/settings' && 'bg-accent text-primary'
                } flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
