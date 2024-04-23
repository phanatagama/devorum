import { NextResponse } from 'next/server';

import { apiBaseUrl } from '@/constant/env';

export async function GET() {
  const res = await fetch(apiBaseUrl + '/leaderboards', {
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json({ ...data });
}
