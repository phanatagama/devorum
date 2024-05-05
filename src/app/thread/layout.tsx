import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';

export const metadata: Metadata = {
  title: 'Thread',
  description: 'Read and discuss with other people about the thread',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className='bg-dark text-white'>
        <div className='layout min-h-screen'>{children}</div>
      </section>
    </>
  );
}
