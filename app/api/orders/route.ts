import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createdAt: "desc" });

    const ordersWithCustomerDetails = await Promise.all(orders.map(async (order) => {
      const customerDetails = await Customer.findOne({ clerkId: order.customerClerkId })
      return {
        _id: order._id.toString(),
        customer: customerDetails.name,
        products: order.products.length,
        totalAmount: order.totalAmount,
        createdAt: format(order.createdAt, "MMMM do, yyyy"),
      }
    }));


    return NextResponse.json(ordersWithCustomerDetails, { status: 200 });
  } catch (error) {
    console.log("[orders_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}