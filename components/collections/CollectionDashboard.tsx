"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { columns } from "./CollectionColumn";
import { DataTable } from "../custom ui/DataTable";

const CollectionDashboard = ({ data }: { data: CollectionType[] }) => {
  const router = useRouter();
  
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={data} searchText="title" />
    </>
  );
};

export default CollectionDashboard;
