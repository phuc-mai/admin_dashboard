import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 400 }
      );
    }

    return NextResponse.json(product, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3001",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      status: 200,
    });
  } catch (error) {
    console.log("[productId_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 400 }
      );
    }

    const {
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
    } = await req.json();

    if (!title || !description || !media || !category || !price || !cost) {
      return new NextResponse("Not enough information to update the product", {
        status: 400,
      });
    }

    // Find the difference between current collections and new collections
    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );

    const removedCollections = product.collections.filter(
      (collectionId: ObjectId) => !collections.includes(collectionId.toString())
    );

    await Promise.all([
      // Add product ID to added collections
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $addToSet: { products: params.productId },
        })
      ),
      // Remove product ID from removed collections
      ...removedCollections.map((collectionId: ObjectId) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: params.productId },
        })
      ),
    ]);

    const updatedProduct = await Product.findByIdAndUpdate(
      params.productId,
      {
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
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log("[productId_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    await connectToDB();

    await Product.findByIdAndDelete(params.productId);

    // Remove the product from all collections that reference it
    await Collection.updateMany(
      { products: params.productId },
      { $pull: { products: params.productId } }
    );

    return new NextResponse("Product deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[productId_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};