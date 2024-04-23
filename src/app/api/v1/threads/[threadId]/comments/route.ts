import { NextRequest, NextResponse } from 'next/server';

import logger from '@/lib/logger';

import { apiBaseUrl } from '@/constant/env';

export async function POST(
  request: NextRequest,
  { params }: { params: { threadId: string } }
) {
  const data = await request.json();
  const threadId = params.threadId;
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  logger(threadId, 'ThreadId');
  const res = await fetch(apiBaseUrl + '/threads/' + threadId + '/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return NextResponse.json({ ...result });
}
