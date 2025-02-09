// app/middleware.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export async function middleware(req) {
  // Get the current session (logged-in user)
  const session = await getServerSession(authOptions);

  // Define the paths that require authentication
  const protectedPaths = ['/admin'];

  // Check if the current path is one of the protected paths
  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    // If the user is not authenticated, redirect to the login page
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/login'; // Redirect to the login page
      return NextResponse.redirect(url);
    }
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}