'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ComboboxProps {
  options: {
    value: string;
    label: string;
  }[];
}
export function Combobox({ options }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {'Select...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup>
            {options.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(
                    value.includes(currentValue)
                      ? value.filter((it) => it !== currentValue)
                      : [...value, currentValue]
                  );
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value.includes(framework.value) ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
