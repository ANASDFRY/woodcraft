import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Ensure this path is correct

// GET a product by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve product", details: error.message },
      { status: 500 }
    );
  }
}