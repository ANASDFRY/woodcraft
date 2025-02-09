import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies(); // ✅ Await cookies() before using it
  await cookieStore.set('session', '', { maxAge: -1 }); // ✅ Expire the session cookie

  return NextResponse.json({ message: 'Logout successful' });
}
