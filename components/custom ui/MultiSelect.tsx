"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";

interface MultiSelectProps {
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export function MultiSelect({
  collections,
  value, // check here
  onChange,
  onRemove,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];
  
  if (value.length === 0) {
    selected = [];
  } else {
    selected = value
      .map((id) => collections.find((collection) => collection._id === id))
      .filter((collection) => collection !== undefined) as CollectionType[];
  }

  const [inputValue, setInputValue] = useState("");

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );

  const addCollection = (collection: CollectionType) => {
    onChange(collection._id);
  };

  return (
    <Command className="overflow-visible bg-white text-grey-1">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              className="ml-1 hover:text-red-1"
              onClick={() => {
                onRemove(collection._id);
              }}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <CommandInput
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder="Select collections"
          className="ml-2"
        />
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((collection) => {
              return (
                <CommandItem
                  key={collection._id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={(value) => {
                    setInputValue("");
                    addCollection(collection);
                  }}
                  className={"cursor-pointer"}
                >
                  {collection.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ) : null}
      </div>
    </Command>
  );
}
