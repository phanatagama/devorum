'use client';

import LoadingBar from 'react-redux-loading-bar';

export default function Loading() {
  return (
    <header>
      <LoadingBar
        className='bg-primary-500 h-5'
        updateTime={100}
        progressIncrease={10}
      />
    </header>
  );
  // const isLoading = useAppSelector((state) => state.isLoading);
  // return (
  //   <>
  //     {isLoading && (
  //       <div className='sticky top-0'>
  //         {/* <ImSpinner2 className='animate-spin mx-auto w-8 h-8' /> */}
  //         <LoadingBar />
  //       </div>
  //     )}
  //   </>
  // );
}
