import OrderItemDashboard from "@/components/orderItems/OrderItemDashboard";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`);
  const { order, customer } = await res.json();

  const { streetNumber, streetName, city, state, postalCode, country } =
    order.shippingAddress;

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
      <OrderItemDashboard data={order.products} />
    </div>
  );
};

export default OrderDetails;
