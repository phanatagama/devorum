import { NextRequest, NextResponse } from 'next/server';

import logger from '@/lib/logger';

import { apiBaseUrl } from '@/constant/env';

export async function POST(request: NextRequest) {
  const data = await request.json();
  logger(data, 'Register data api:');
  const res = await fetch(apiBaseUrl + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return NextResponse.json({ ...result });
}
