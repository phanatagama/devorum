import { NextResponse } from 'next/server';

import { apiBaseUrl } from '@/constant/env';

export async function GET(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  const threadId = params.threadId;
  const res = await fetch(apiBaseUrl + '/threads/' + threadId, {
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json({ ...data });
}
