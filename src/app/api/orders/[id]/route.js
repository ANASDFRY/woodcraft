import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {productId, fullName, phone, wilaya, address, status} = await request.json();
    
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { productId, fullName, phone, wilaya, address, status}
    });
    
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.order.delete({
      where: { id: Number(id) }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}