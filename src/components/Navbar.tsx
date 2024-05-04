'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchProfile } from '@/lib/features/profile/action';
import { useAppDispatch } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathUrl = usePathname();

  const dispatch = useAppDispatch();

  const [token, setToken] = useState<string | null>(null);

  function getLocalStorageItem(key: string) {
    try {
      setToken(localStorage.getItem(key));
    } catch (e) {
      setToken(null);
    }
  }

  useEffect(() => {
    dispatch(fetchProfile());
    getLocalStorageItem('token');
  }, [dispatch]);

  return (
    <nav className='flex justify-between items-center bg-gray-800 py-4 px-6'>
      <h1 className='text-white text-2xl font-bold'>Forum</h1>
      <ul className='flex space-x-4'>
        <NavItem name='Home' href='/' pathUrl={pathUrl} />
        <NavItem name='Leaderboard' href='/leaderboard' pathUrl={pathUrl} />
        <NavItem
          name={token === null || token === '' ? 'Sign In' : 'Sign Out'}
          href='/login'
          pathUrl={pathUrl}
        />
      </ul>
    </nav>
  );
}
const NavItem = ({
  name,
  href,
  pathUrl,
}: {
  name: string;
  href: string;
  pathUrl: string;
}) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'text-white hover:text-gray-300',
          pathUrl === href && 'text-gray-500 font-bold'
        )}
      >
        {name}
      </Link>
    </li>
  );
};
