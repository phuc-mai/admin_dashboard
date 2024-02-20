import { format } from "date-fns";

import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import Customer from "@/lib/models/Customer";
import OrderDashboard from "@/components/orders/OrderDashboard";

const Orders = async () => {
  await connectToDB();

  const orders = await Order.find({ orderBy: { createdAt: "desc" } });

  const formattedOrders = await Promise.all(
    orders.map(async (order) => {
      const customer = await Customer.findOne({
        clerkId: order.customerClerkId,
      });
      return {
        _id: order._id.toString(),
        customer: customer.name,
        products: order.products.length,
        totalAmount: order.totalAmount,
        createdAt: format(order.createdAt, "MMMM do, yyyy"),
      };
    })
  );

  return (
    <div className="px-10 py-5">
      <OrderDashboard data={formattedOrders} />
    </div>
  );
};

export default Orders;
