"use client"

import Loader from "@/components/custom ui/Loader";
import OrderDashboard from "@/components/orders/OrderDashboard";

import { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`)
      const data = await res.json()
      setOrders(data)
      setLoading(false)
    } catch (err) {
      console.log("[orders_GET", err)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <OrderDashboard data={orders} />
    </div>
  );
};

export default Orders;
