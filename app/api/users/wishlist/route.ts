import User from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
  try {
    await connectToDB();

    const { clerkId, favoriteItem } = await req.json();

    if (!clerkId || !favoriteItem) {
      return new NextResponse("Not enough information to add favorite", {
        status: 400,
      });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({
        clerkId,
        wishlist: [favoriteItem],
      });
    } else {
      user.wishlist.push(favoriteItem);
    }

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[users_wishlist_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}