'use client';
import { ImSpinner2 } from 'react-icons/im';

import { useAppSelector } from '@/lib/hooks';

export default function Loading() {
  const isLoading = useAppSelector((state) => state.isLoading);
  return (
    <>
      {isLoading && (
        <div className='sticky top-0'>
          <ImSpinner2 className='animate-spin mx-auto w-8 h-8' />
        </div>
      )}
    </>
  );
}
