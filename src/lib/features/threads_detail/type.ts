import { ThreadData } from '@/lib/features/threads/type';

export interface DataDetailThread {
  detailThread: DetailThread;
}
export type DetailThread = ThreadData & {
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: CommentData[];
};
export interface CommentData {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
}
export interface Owner {
  id: string;
  name: string;
  avatar: string;
}
