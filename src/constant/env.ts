export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const apiBaseUrl = 'https://forum-api.dicoding.dev/v1';

export const localhostUrl = isLocal
  ? 'http://localhost:3000/api/v1'
  : 'https://tanya.vercel.app/api/v1';
