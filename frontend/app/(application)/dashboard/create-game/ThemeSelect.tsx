'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateGameFormValues } from './create-game-form.helper';
import { themes } from './themes';

const BUTTON_STYLES =
  'inline-flex w-full items-center cursor-pointer whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-between';

export default function ThemeSelect() {
  const { setValue, getValues } = useFormContext<CreateGameFormValues>();
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');
  const onThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          aria-label="Select a theme"
          className={BUTTON_STYLES}
        >
          <span>{`${
            selectedTheme === '' ? 'Select a theme' : selectedTheme
          }`}</span>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command value={selectedTheme}>
          <CommandList>
            <CommandInput placeholder="Search theme..." />
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup heading="Themes">
              {themes.map((item: string) => (
                <CommandItem
                  key={item}
                  className="text-sm"
                  onSelect={() => {
                    setSelectedTheme(item);
                    setValue('theme', item);
                    setOpen(false);
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
