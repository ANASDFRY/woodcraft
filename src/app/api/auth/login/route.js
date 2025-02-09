import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUser, verifyPassword } from '../../../lib/auth';

export async function POST(request) {
  const { email, password } = await request.json();
  const user = await getUser(email);

  if (!user || !(await verifyPassword(user, password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // ✅ Await cookies() before using it
  const cookieStore = await cookies();
  cookieStore.set('session', user.email, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    path: '/' 
  });

  return NextResponse.json({ message: 'Login successful' });
}
