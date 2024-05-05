import { hideLoading, showLoading } from '@/lib/features/loading/action';
import logger from '@/lib/logger';
import { AppDispatch } from '@/lib/store';

import { apiBaseUrl, isLocal, localhostUrl } from '@/constant/env';

export function asyncLogin({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const res = await fetch(apiBaseUrl + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      logger(
        `isLocal: ${isLocal} | url: ${localhostUrl} | vercel: ${process.env.NEXT_PUBLIC_PROJECT_URL}`,
      );
      if (response.status === 'fail') {
        alert('Login failed! Please try again.\n' + response.message);
      } else {
        window.localStorage.setItem('token', response.data.token);
        window.location.href = '/';
        alert('Login successful! ');
      }
      // Handle successful registration
    } catch (error) {
      // Handle registration errors
      logger(
        error,
        `Login error: . this is local: ${isLocal} | url: ${localhostUrl} | vercel: ${process.env.NEXT_PUBLIC_PROJECT_URL}`,
      );
      alert('Login failed! Please try again');
      throw new Error('Login failed');
    }
    dispatch(hideLoading());
  };
}
