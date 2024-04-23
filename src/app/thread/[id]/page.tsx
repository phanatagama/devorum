'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { asyncfetchThread } from '@/lib/features/threads_detail/action';
import { CommentData } from '@/lib/features/threads_detail/type';
import { getFromLocalStorage } from '@/lib/helper';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import { FormComment } from '@/components/comment/comment-form';
import CommentItem from '@/components/comment/comment-item';
import Navbar from '@/components/Navbar';
import ThreadItem from '@/components/thread/thread-item';

export default function ThreadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const dispatch = useAppDispatch();

  const detailThread = useAppSelector((state) => state.detailThread);
  useEffect(() => {
    dispatch(asyncfetchThread(params.id));
  }, [dispatch, params.id]);
  const router = useRouter();

  const token = getFromLocalStorage('token');
  return (
    <div className='pt-4'>
      <Navbar />
      {detailThread.title ? (
        <>
          <ThreadItem
            thread={detailThread}
            onClickCategory={(_) => router.back()}
          />
          <hr />
          <h3 className='my-4'>Comments</h3>
          {token !== null && <FormComment params={params} />}
          <ul>
            <CommentBody comments={detailThread.comments} />
          </ul>
        </>
      ) : (
        <h1>No Detail Thread</h1>
      )}
    </div>
  );
}

const CommentBody = ({ comments }: { comments: CommentData[] }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <li
            key={comment.id}
            className='hover:cursor-pointer hover:bg-gray-700 bg-gray-800 p-2 my-2 rounded-md'
          >
            <CommentItem comment={comment} />
          </li>
        );
      })}
    </>
  );
};
