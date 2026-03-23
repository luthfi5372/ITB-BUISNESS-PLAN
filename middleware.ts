// middleware.ts
// Auth middleware dinonaktifkan untuk mode demo/development.
// Aktifkan kembali saat sudah ada sistem autentikasi (NextAuth / Supabase Auth).

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // DEMO MODE: semua route bisa diakses tanpa login
  // TODO: aktifkan kembali saat backend auth sudah siap
  return NextResponse.next();
}

// export const config = {
//   matcher: ['/dashboard/:path*', '/profile/:path*'],
// };
