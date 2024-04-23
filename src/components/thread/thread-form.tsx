import { useState } from 'react';

import { asyncPostThread } from '@/lib/features/threads_detail/action';
import { useAppDispatch } from '@/lib/hooks';

export function FormThread() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === '' || body === '') {
      alert('Title and body cannot be empty');
      return;
    }
    dispatch(asyncPostThread({ title, body, category }));
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setBody('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className='bg-gray-800 p-4 mt-4'>
      <h2>Create Thread</h2>
      <hr />
      <div className='my-4'>
        <label htmlFor='title' className='block text-lg font-bold mb-2'>
          Title
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='body' className='block text-lg font-bold mb-2'>
          Body
        </label>
        <textarea
          id='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className='w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
        ></textarea>
      </div>

      <div className='mb-4'>
        <label htmlFor='category' className='block text-lg font-bold mb-2'>
          Category
        </label>
        <input
          type='text'
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
        />
      </div>

      <button
        type='submit'
        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
      >
        Submit
      </button>
    </form>
  );
}
