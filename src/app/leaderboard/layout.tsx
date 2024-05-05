import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';

export const metadata: Metadata = {
  title: 'Leaderboard',
  description: 'Leaderboard of the forum users',
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
