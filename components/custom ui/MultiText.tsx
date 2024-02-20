"use client";

import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface MultiTextProps {
  // disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  placeholder: string;
}

const MultiText: React.FC<MultiTextProps> = ({ onChange, onRemove, value, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (item: string) => {
    onChange(item);
    setInputValue('');
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { 
            e.preventDefault();
            addTag(inputValue);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((tag, index) => {
          return (
            <Badge key={index} className="bg-grey-1 text-white">
              {tag}
              <button
                className="ml-1 rounded-full outline-none hover:bg-red-1"
                onClick={() => onRemove(tag)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default MultiText;
