'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import { asyncFetchUsers } from '@/lib/features/users/action';

import { AppStore, makeStore } from '../lib/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(asyncfetchThreads());
    storeRef.current.dispatch(asyncFetchUsers());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
