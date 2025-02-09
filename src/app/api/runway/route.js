import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const admin = await prisma.user.upsert({
      where: { email: "anas@gmail.com" },
      update: {},
      create: {
        email: "anas@gmail.com",
        password: "admin123",
        role: "ADMIN",
      },
    });

    return Response.json({ success: true, admin });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
