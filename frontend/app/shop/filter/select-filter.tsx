import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, X } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SelectFilterProps {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
}

function SelectFilter({ value = [], onChange, options }: SelectFilterProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className="w-full mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className="hover:bg-transparent flex items-center justify-between w-full"
              role="combobox"
              aria-expanded={open}>
              <h3 className="font-bold uppercase">Subcategory</h3>
              <ChevronDown className="ml-2 h-6 w-6 shrink-0 opacity-75" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No result found.</CommandEmpty>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      if (value.includes(currentValue)) {
                        onChange(value.filter((v) => v !== currentValue));
                      } else {
                        onChange([...value, currentValue]);
                      }
                    }}>
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value.includes(item.label.toLowerCase()) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-2 flex-wrap">
        {value.map((item, index) => (
          <Badge className="rounded-lg text-sm" key={index}>
            {item}
            <button
              className="ml-2"
              onClick={() => {
                onChange(value.filter((v) => v !== item));
              }}>
              <X className="w-4 h-4" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default SelectFilter;
