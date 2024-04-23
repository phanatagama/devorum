import { NextResponse } from 'next/server';

import { apiBaseUrl } from '@/constant/env';

export async function GET() {
  const res = await fetch(apiBaseUrl + '/threads', {
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json({ ...data });
}

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  const body = await request.json();
  const res = await fetch(apiBaseUrl + '/threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json({ ...data });
}
