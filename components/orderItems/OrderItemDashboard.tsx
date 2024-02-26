"use client";

import { columns } from "./OrderItemColumn";
import { DataTable } from "../custom ui/DataTable";

const OrderItemDashboard = ({ data }: { data: OrderItemColumnType[] }) => {
  return <DataTable columns={columns} data={data} searchText="product" />;
};

export default OrderItemDashboard;
