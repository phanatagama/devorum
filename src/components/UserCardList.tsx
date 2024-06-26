import { Leaderboard } from '@/lib/features/leaderboards/type';

import NextImage from '@/components/NextImage';

const UserCardList: React.FC<{ leaderboards: Leaderboard[] }> = ({
  leaderboards,
}) => {
  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4'>
      {leaderboards.map((item) => (
        <div key={item.user.id} className='bg-gray-800 p-4 shadow-md'>
          <NextImage
            useSkeleton
            className='w-16 sm:w-24 md:w-32 bg-red-400 mx-auto rounded-full aspect-square object-cover overflow-hidden'
            src={item.user.avatar}
            width='180'
            height='180'
            alt={item.user.name}
          />
          {/* <img
            src={item.user.avatar}
            alt={item.user.name}
            className='w-16 h-16 rounded-full mx-auto'
          /> */}
          <h2 className='text-xl font-bold text-center mt-2'>
            {item.user.name}
          </h2>
          <p className='text-gray-500 text-center'>{item.score}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCardList;
