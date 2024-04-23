import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiChat3Line } from 'react-icons/ri';

import { ThreadData } from '@/lib/features/threads/type';
import { DetailThread, Owner } from '@/lib/features/threads_detail/type';
import { formatDate } from '@/lib/helper';
import { useAppSelector } from '@/lib/hooks';

import IconButton from '@/components/buttons/IconButton';
import TextButton from '@/components/buttons/TextButton';
import NextImage from '@/components/NextImage';

export default function ThreadItem({
  thread,
  onClickCategory,
}: {
  thread: ThreadData & DetailThread;
  onClickCategory: (category: string) => void;
}) {
  const pathName = usePathname();
  if (pathName !== '/') {
    return (
      <div className='hover:cursor-auto hover:bg-gray-700 bg-gray-800 p-2 my-2 rounded-md'>
        <ThreadItemContent thread={thread} onClickCategory={onClickCategory} />
      </div>
    );
  }
  return (
    <li className='hover:bg-gray-700 bg-gray-800 p-2 my-2 rounded-md'>
      <ThreadItemContent thread={thread} onClickCategory={onClickCategory} />
    </li>
  );
}

const ThreadItemContent = ({
  thread,
  onClickCategory,
}: {
  thread: ThreadData & DetailThread;
  onClickCategory: (category: string) => void;
}) => {
  const users = useAppSelector((state) => state.users);
  const owner: Owner | undefined = users.find(
    (user) =>
      user.id === thread.ownerId || user.id === (thread?.owner?.id || '')
  );

  const comingsoon = () => {
    alert('Coming soon');
  };

  return (
    <>
      <div className='mx-3 text-wrap overflow-hidden'>
        <Link href={`/thread/${thread.id}`} className='hover:cursor-pointer'>
          <div className='flex items-center'>
            {owner !== undefined && (
              <NextImage
                src={owner.avatar}
                className='w-8 h-8 bg-red-500 rounded-full aspect-square object-cover overflow-hidden'
                alt={owner.name}
                width={64}
                height={64}
              />
            )}
            <div className='mx-4'>
              <h3 className='text-lg font-medium text-gray-100'>
                {thread.title}
              </h3>
              <p className='text-sm font-light text-gray-500'>
                by {owner?.name}
              </p>
            </div>
          </div>
          <p className='text-base font-light text-gray-300'>{thread.body}</p>
        </Link>
      </div>
      <div className='ml-3'>
        <TextButton
          className='text-sm'
          onClick={() => onClickCategory(thread.category)}
        >
          #{thread.category}
        </TextButton>
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
            <p className='text-sm'>{thread.upVotesBy.length}</p>
          </div>
          <div className='flex items-center'>
            <IconButton
              onClick={comingsoon}
              variant='ghost'
              icon={ArrowBigDown}
              className='text-blue-500'
            />
            <p className='text-sm'>{thread.downVotesBy.length}</p>
          </div>
          <div className='flex items-center'>
            <IconButton variant='ghost' icon={RiChat3Line} />
          </div>
          <p className='text-sm'>
            {thread.totalComments ?? thread.comments.length}
          </p>
        </div>
        <p className='text-sm text-gray-500 items-center'>
          {formatDate(thread.createdAt)}
        </p>
      </div>
    </>
  );
};
