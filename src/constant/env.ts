export const isProd = process.env.NODE_ENV === 'production';
export const isLocal =
  process.env.NODE_ENV === 'development' ||
  process.env.VERCEL_URL === undefined ||
  process.env.VERCEL_URL === 'undefined';
const vercelUrl =
  process.env.VERCEL_URL === undefined
    ? 'devorum-git-testing-phanatagamas-projects'
    : process.env.VERCEL_URL;
export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const apiBaseUrl = 'https://forum-api.dicoding.dev/v1';

export const localhostUrl =
  isLocal || vercelUrl === 'undefined'
    ? 'http://localhost:3000/api/v1'
    : `https://${vercelUrl}.vercel.app/api/v1`;
