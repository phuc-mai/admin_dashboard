"use client";

import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { columns } from "./ProductColumn";
import { DataTable } from "../custom ui/DataTable";
import { useRouter } from "next/navigation";

const ProductDashboard = ({ data }: { data: ProductType[] }) => {
  const router = useRouter();
  
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={data} searchText="title" />
    </>
  );
};

export default ProductDashboard;
