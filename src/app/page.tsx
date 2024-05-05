'use client';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import { asyncfetchThreads } from '@/lib/features/threads/action';
import { ThreadData } from '@/lib/features/threads/type';
import { initialDetailThreadState } from '@/lib/features/threads_detail/reducer';
import { getFromLocalStorage } from '@/lib/helper';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Button from '@/components/buttons/Button';
import Navbar from '@/components/Navbar';
import { FormThread } from '@/components/thread/thread-form';
import ThreadItem from '@/components/thread/thread-item';

export default function Dashboard() {
  const threads = useAppSelector((state) => state.threads);
  const [token, setToken] = React.useState<string | null>(null);

  const [categories, setCategories] = React.useState<string>('');
  const onClickCategory = (category: string) => {
    setCategories(category);
  };
  const filteredThreads = threads.filter((x) => {
    if (categories === '') return true;
    return x.category === categories;
  });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setToken(getFromLocalStorage('token'));
    dispatch(asyncfetchThreads());
  }, [dispatch]);
  return (
    <>
      <div className='pt-4'>
        <Navbar />
        {token !== null && <FormThread />}
        {categories && (
          <div className='flex'>
            <h5 className='text-xl font-bold mr-3'>Filter Category:</h5>
            <Button
              size='sm'
              variant='primary'
              rightIcon={RiCloseLine}
              onClick={() => onClickCategory('')}
            >
              #{categories}
            </Button>
          </div>
        )}

        <ul className='divide-y divide-gray-200'>
          {filteredThreads.map((thread: ThreadData) => (
            <ThreadItem
              key={thread.id}
              thread={{
                ...initialDetailThreadState,
                ...thread,
              }}
              onClickCategory={onClickCategory}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
