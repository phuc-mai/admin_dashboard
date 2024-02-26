import { Separator } from "../ui/separator";
import { columns } from "./OrderColumn";
import { DataTable } from "../custom ui/DataTable";

const OrderDashboard = ({ data }: { data: OrderColumnType[] }) => {
  return (
    <>
      <p className="text-heading2-bold">Orders</p>

      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={data} searchText="_id" />
    </>
  );
};

export default OrderDashboard;
