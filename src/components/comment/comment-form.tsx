import { useState } from 'react';

import { asyncPostComments } from '@/lib/features/comments/action';
import { useAppDispatch } from '@/lib/hooks';

export function FormComment({ params }: { params: { id: string } }) {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content === '') {
      alert('Content cannot be empty');
      return;
    }
    dispatch(asyncPostComments({ params, content }));
    resetForm();
  };

  const resetForm = () => {
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='bg-gray-800 p-4 mt-4'>
      <div className='mb-4'>
        <label htmlFor='body' className='block text-lg font-bold mb-2'>
          Create Comment
        </label>
        <textarea
          id='body'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
        ></textarea>
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
