'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import { asyncLogin } from '@/lib/features/login/action';
import { getFromLocalStorage } from '@/lib/helper';
import { useAppDispatch } from '@/lib/hooks';
import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Navbar from '@/components/Navbar';

const Schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type Schema = z.infer<typeof Schema>;
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = Schema.parse({ email, password });
      // Handle successful form submission
      logger(data, 'Form data:');
      dispatch(asyncLogin({ data }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setErrors({
          email:
            error.errors.find((err) => err.path[0] === 'email')?.message || '',
          password:
            error.errors.find((err) => err.path[0] === 'password')?.message ||
            '',
        });
      } else {
        // Handle other errors
        logger(error, 'Error:');
      }
    }
  };

  const router = useRouter();
  const token = getFromLocalStorage('token');

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    router.refresh();
  };

  return (
    <>
      <div className='pt-4'>
        <Navbar />
        <div className='bg-gray-800 p-4 my-4'>
          {token ? (
            <div className='flex flex-col justify-center'>
              <h1 className='text-2xl text-white font-bold text-center'>
                You are already logged in
              </h1>
              <Button
                onClick={handleLogout}
                className='bg-gray-500  text-center mx-auto mt-4'
              >
                logout
              </Button>
            </div>
          ) : (
            <>
              <h1 className='text-2xl text-white font-bold text-center'>
                Sign In
              </h1>
              <form onSubmit={handleSubmit} className='max-w-md mx-auto my-4'>
                <div className='mb-4'>
                  <label htmlFor='email' className='block mb-2'>
                    Email:
                  </label>
                  <input
                    type='email'
                    id='email'
                    data-testid='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
                  />
                  {errors.email && (
                    <span className='text-red-500'>{errors.email}</span>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='password' className='block mb-2'>
                    Password:
                  </label>
                  <input
                    type='password'
                    id='password'
                    data-testid='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
                  />
                  {errors.password && (
                    <span className='text-red-500'>{errors.password}</span>
                  )}
                </div>
                <div className='flex'>
                  <button
                    data-testid='submit'
                    type='submit'
                    className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                  >
                    Sign In
                  </button>
                  <Link
                    href='/register'
                    className='bg-gray-500 rounded-md p-2 mx-2'
                  >
                    <p>SignUp</p>
                  </Link>
                </div>
              </form>
            </>
          )}
          {/* <div className='pt4'>
            <h1>Welcome {profile.name}! </h1>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
