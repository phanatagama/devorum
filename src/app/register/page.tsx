'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import { asyncRegister } from '@/lib/features/register/action';
import { useAppDispatch } from '@/lib/hooks';
import logger from '@/lib/logger';

import Navbar from '@/components/Navbar';

const Schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type Schema = z.infer<typeof Schema>;
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('token')
      : undefined;
  if (token) router.push('/login');
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = Schema.parse({ name, email, password });
      // Handle successful form submission
      dispatch(asyncRegister({ data }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setErrors({
          name:
            error.errors.find((err) => err.path[0] === 'name')?.message || '',
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
  // existing code...

  return (
    <>
      <div className='pt-4'>
        <Navbar />
        <div className='bg-gray-800 p-4 my-4'>
          <h1 className='text-2xl text-white font-bold text-center'>
            Register
          </h1>
          <form onSubmit={handleSubmit} className='max-w-md mx-auto my-4'>
            <div className='mb-4'>
              <label htmlFor='name' className='block mb-2'>
                Name:
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
              />
              {errors.name && (
                <span className='text-red-500'>{errors.name}</span>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block mb-2'>
                Email:
              </label>
              <input
                type='email'
                id='email'
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
                type='submit'
                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
              >
                Register
              </button>
              <Link href='/login' className='bg-gray-500 rounded-md p-2 mx-2'>
                <p>Sign In</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
