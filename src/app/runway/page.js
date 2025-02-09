"use client"; // This makes it a Client Component

import { PrismaClient } from "@prisma/client";
import { useCallback } from "react";

const prisma = new PrismaClient(); // Move this outside the component to avoid re-instantiating it

export default function RunWay() {
  const runn = useCallback(async () => {
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
      console.log("Admin created:", admin);
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  }, []);

  return <button onClick={runn}>runn</button>;
}
