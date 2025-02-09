// // pages/api/products.js
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default async function handler(req, res) {
//   try {
//     switch (req.method) {
//       case 'GET':
//         const products = await prisma.product.findMany();
//         res.status(200).json(products);
//         break;

//       case 'POST':
//         const { name, price, description, image } = req.body;
//         const product = await prisma.product.create({
//           data: { name, price: parseFloat(price), description, image }
//         });
//         res.status(201).json(product);
//         break;

//       default:
//         res.setHeader('Allow', ['GET', 'POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// export async function POST(request) {
//   try {
//     const body = await request.json(); // Ensure JSON is received
//     console.log("Received Data:", body); // Debugging

//     // Destructure fields
//     const { name, price, image, description } = body;

//     // Validation: Ensure all required fields exist
//     if (!name || !price || !description) {
//       return NextResponse.json(
//         { error: 'الرجاء ملء جميع الحقول المطلوبة' },
//         { status: 400 }
//       );
//     }

//     // Ensure price is a number
//     const numericPrice = parseFloat(price);
//     if (isNaN(numericPrice)) {
//       return NextResponse.json(
//         { error: 'السعر يجب أن يكون رقمًا صالحًا' },
//         { status: 400 }
//       );
//     }
    
//     const product = await prisma.product.create({
//       data: {
//         name :name,
//         price: numericPrice,
//         image: image || "null",
//         description: description,
//       },
//     });

//     console.log("Created Product:", product); // Debugging
//     return NextResponse.json(product, { status: 201 });

//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: 'فشل إنشاء المنتج', details: error.message },
//       { status: 500 }
//     );    
//   }
// }

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Body:", body);

    const { name, price, description, image } = body;
    if (!name || !price || !description) {
      console.error("Validation Error: Missing fields");
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure the price is numeric
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      console.error("Validation Error: Price must be numeric");
      return NextResponse.json(
        { error: 'Price must be numeric' },
        { status: 400 }
      );
    }

    console.log("Data to Insert:", { name, numericPrice, description, image });

    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        name,
        price: numericPrice,
        image: image || null,
        description,
      },
    });
    console.log("Created Product:", product);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    // console.error("API Error:", error, JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: 'فشل إنشاء المنتج', details: error.message + "asdd" || 'Unknown error' },
      { status: 500 }
    );
  }
}

