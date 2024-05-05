import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login with your account to start discuss',
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
