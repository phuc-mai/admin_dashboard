import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
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

    return NextResponse.json({ order, customer }, { status: 200 });
  } catch (error) {
    console.log("[orderId_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
