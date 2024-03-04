"use client";

import { Separator } from "../ui/separator";
import { columns } from "./CustomerColumn";
import { DataTable } from "../custom ui/DataTable";

const CustomerDashboard = ({ data }: { data: CustomerType[] }) => {
  return (
    <>
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={data} searchText="name" />
    </>
  );
};

export default CustomerDashboard;
