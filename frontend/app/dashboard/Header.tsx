'use client';
import { Button } from '@/components/ui/button';
import Logo from '@/public/Logo.svg';
import { deleteCookie } from 'cookies-next';
import {
  Home,
  ListChecks,
  LogOut,
  Package,
  PanelLeft,
  Settings,
  Users2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { AuthContext } from '@/app/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

const Header = () => {
  const { teamData } = useContext(AuthContext) as IAuthContext;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="flex sticky top-0 z-30 h-14 items-center gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:px-6">
      <h1 className="hidden sm:flex pl-12 text-lg font-extrabold uppercase text-fuchsia-700">
        Hackathonify
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <span className="group flex shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base">
              <Image
                src={Logo}
                alt="logo decorative element"
                className="h-6 w-6 transition-all"
              />
              <span className="text-lg font-extrabold uppercase text-fuchsia-700 cursor-default">
                Hackathonify
              </span>
            </span>
            <Link
              href="/dashboard"
              className={`text-muted-foreground flex items-center gap-4 px-2.5 hover:text-foreground ${
                pathname == '/dashboard' && 'text-primary'
              } `}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/files"
              className={`text-muted-foreground flex items-center gap-4 px-2.5 hover:text-foreground ${
                pathname == '/dashboard/files' && 'text-primary'
              } `}
            >
              <Package className="h-5 w-5" />
              Files
            </Link>
            <Link
              href="/dashboard/members"
              className={`text-muted-foreground flex items-center gap-4 px-2.5 hover:text-foreground ${
                pathname == '/dashboard/members' && 'text-primary'
              } `}
            >
              <Users2 className="h-5 w-5" />
              Members
            </Link>
            <Link
              href="/applications"
              className={`text-muted-foreground flex items-center gap-4 px-2.5 hover:text-foreground`}
            >
              <ListChecks className="h-5 w-5" />
              Applications
            </Link>
            <Link
              href="/dashboard/settings"
              className={`text-muted-foreground flex items-center gap-4 px-2.5 hover:text-foreground`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={() => {
                deleteCookie('token');
                history.pushState({}, '', '/');
                router.push('/');
                toast.success('Successfully logged out');
              }}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="overflow-hidden rounded-full ml-auto bg-fuchsia-700 text-white text-2xl font-semibold"
          >
            {teamData?.name?.charAt(0).toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Team {teamData?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href="/dashboard/settings">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              onClick={() => {
                deleteCookie('token');
                history.pushState({}, '', '/');
                router.push('/');
                toast.success('Successfully logged out');
              }}
              className="flex gap-2"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
