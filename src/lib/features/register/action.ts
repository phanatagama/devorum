import { hideLoading, showLoading } from '@/lib/features/loading/action';
import logger from '@/lib/logger';
import { AppDispatch } from '@/lib/store';

import { localhostUrl } from '@/constant/env';

export function asyncRegister({
  data,
}: {
  data: {
    name: string;
    email: string;
    password: string;
  };
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const res = await fetch(localhostUrl + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (response.status === 'fail') {
        alert('Registration failed! Please try again.\n' + response.message);
      } else {
        window.location.href = '/login';
        alert('Registration successful! Please login to continue.');
      }
      // Handle successful registration
    } catch (error) {
      // Handle registration errors
      logger(error, 'Registration error:');
    }
    dispatch(hideLoading());
  };
}