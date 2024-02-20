import OrderItemDashboard from "@/components/orderItems/OrderItemDashboard";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  await connectToDB();

  const order = await Order.findById(params.orderId).populate({
    path: "products.product",
    model: Product,
  });

  if (!order) {
    return new NextResponse(JSON.stringify({ message: "Order not found" }), {
      status: 400,
    });
  }

  const customer = await Customer.findOne({ clerkId: order.customerClerkId });

  const { streetNumber, streetName, city, state, postalCode, country } =
    order.shippingAddress;

  const products = order.products.map((item: OrderItemType) => {
    return {
      _id: item.product._id.toString(),
      title: item.product.title,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    };
    
  });

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{order._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Shipping address:{" "}
        <span className="text-base-medium">
          {streetNumber} {streetName}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="text-base-bold">Total Paid: <span className="text-base-medium">${order.totalAmount}</span></p>
      <p className="text-base-bold">Products:</p>
      <OrderItemDashboard data={products} />
    </div>
  );
};

export default OrderDetails;
