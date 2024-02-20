import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    await connectToDB();

    const { title, description, media, category, collections, tags, price, cost, sizes, colors } = await req.json();

    if (!title || !description || !media || !category || !price || !cost) {
      return new NextResponse("Not enough information to create a product", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      price,
      cost,
      sizes,
      colors,
    });

    await newProduct.save();

    // update collections
    for (const collectionId of collections) {
      await Collection.findByIdAndUpdate(collectionId, {
        $push: { products: newProduct._id },
      });
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("products_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find().sort({ createdAt: "desc" }).populate({
      path: "collections",
      model: Collection,
    });
    
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("[products_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}