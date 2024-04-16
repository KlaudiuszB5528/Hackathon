'use client';

import { Button } from '@/components/ui/button';
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

export default function CreateGameForm() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-label={`Select a theme`}
          className="bg-fuchsia-700 hover:bg-fuchsia-800 flex items-center gap-3"
        >
          <span>Select a theme</span>
          <ChevronDown
            className={`w-5 h-5 mt-1 transition-transform duration-150 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search theme" />
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup heading="Themes">
              {['item1', 'item2', 'item3'].map((item) => (
                <CommandItem key={item}>{item}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
