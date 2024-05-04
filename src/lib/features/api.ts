import { localhostUrl } from '@/constant/env';

const api = (() => {
  async function getLeaderBoards() {
    const res = await fetch(localhostUrl + '/leaderboards');
    const data = await res.json();
    return data;
  }
  async function getProfile() {
    const res = await fetch(localhostUrl + '/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    return data;
  }

  return {
    getLeaderBoards,
    getProfile,
  };
})();

export default api;
