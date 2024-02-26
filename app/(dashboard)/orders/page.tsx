import OrderDashboard from "@/components/orders/OrderDashboard";

const Orders = async () => {
  const res = await fetch("http://localhost:3000/api/orders");
  const orders = await res.json();

  return (
    <div className="px-10 py-5">
      <OrderDashboard data={orders} />
    </div>
  );
};

export default Orders;
