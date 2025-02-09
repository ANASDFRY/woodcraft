import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}



export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Body:", body);

    const {productId, fullName, phone, wilaya, address, quantity, totalMount} = body;
    if (!productId || !fullName || !phone || !wilaya || !address || !quantity || !totalMount) {
      console.error("Validation Error: Missing fields");
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    
    console.log("Data to Insert:", {productId, fullName, phone, wilaya, address, quantity, totalMount});

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        productId,
        fullName,
        phone,
        wilaya,
        address,
        quantity, 
        totalMount
      },
    });
    console.log("Created Order:", order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    // console.error("API Error:", error, JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: 'فشل إنشاء ', details: error.message + "asdd" || 'Unknown error' },
      { status: 500 }
    );
  }
}

