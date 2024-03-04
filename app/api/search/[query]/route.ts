import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
    await connectToDB();

    const serchedProducts = await Product.find({
      $or: [
        { title: { $regex: params.query, $options: "i" } },
        { category: { $regex: params.query, $options: "i" } },
        { tags: { $in: [new RegExp(params.query, 'i')] } }, // Match any tag that contains the search query
      ],
    });

    return NextResponse.json(serchedProducts, { status: 200 });
  } catch (err) {
    console.log("[search_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
