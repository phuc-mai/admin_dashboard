"use client";

import { CldUploadWidget } from "next-cloudinary";

import { ImagePlus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  // disabled?: boolean;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="z-10 absolute top-0 right-0">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm" className="bg-red-1 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover rounded-lg"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="qge6i0t5">
        {({ open }) => {
          return (
            <Button type="button" className="bg-grey-1 text-white" onClick={() => open()}>
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
