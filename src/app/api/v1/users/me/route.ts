import { NextResponse } from 'next/server';

import logger from '@/lib/logger';

import { apiBaseUrl } from '@/constant/env';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  logger(token, 'Token:');
  const res = await fetch(apiBaseUrl + '/users/me', {
    next: {
      revalidate: 60,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return NextResponse.json({ ...data });
}
