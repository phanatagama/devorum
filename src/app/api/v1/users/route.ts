import { NextResponse } from 'next/server';

import { apiBaseUrl } from '@/constant/env';

export async function GET() {
  const res = await fetch(apiBaseUrl + '/users', {
    next: {
      revalidate: 60,
    },
  });
  const data = await res.json();
  return NextResponse.json({ ...data });
}
