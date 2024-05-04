export interface ApiResponse<Type> {
  message: string;
  status: string;
  data: Type;
}
export interface DataLeaderboard {
  leaderboards: Leaderboard[];
}

export type Leaderboard = {
  user: User;
  score: number;
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
