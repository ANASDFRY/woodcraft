// lib/auth.js

import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

export async function getUser(email) {
  return prisma.user.findFirst({ where: { email } });
}

export async function verifyPassword(user, password) {
  if (!user) return false;
  return password == user.password;
}