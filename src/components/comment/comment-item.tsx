import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

import { CommentData } from '@/lib/features/threads_detail/type';
import { formatDate } from '@/lib/helper';

import IconButton from '@/components/buttons/IconButton';

export default function CommentItem({ comment }: { comment: CommentData }) {
  return (
    <div className='hover:cursor-auto p-2 my-2 rounded-md'>
      <CommentItemContent comment={comment} />
    </div>
  );
}

const CommentItemContent = ({ comment }: { comment: CommentData }) => {
  const comingsoon = () => {
    alert('Coming soon');
  };

  return (
    <>
      <div className='mx-3'>
        <h3 className='text-lg font-medium text-gray-100'>
          {comment.owner.name}
        </h3>
        <p className='text-sm font-light text-gray-300'>{comment.content}</p>
      </div>
      <div className='mx-3 space-x-2 flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='flex items-center'>
            <IconButton
              onClick={comingsoon}
              variant='ghost'
              icon={ArrowBigUp}
              className='text-red-500'
            />
            <p className='text-sm'>{comment.upVotesBy.length}</p>
          </div>
          <div className='flex items-center'>
            <IconButton
              onClick={comingsoon}
              variant='ghost'
              icon={ArrowBigDown}
              className='text-blue-500'
            />
            <p className='text-sm'>{comment.downVotesBy.length}</p>
          </div>
        </div>
        <p className='text-base text-end justify-end'>
          {formatDate(comment.createdAt)}
        </p>
      </div>
    </>
  );
};
