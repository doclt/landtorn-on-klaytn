export const getBaseUrlHelper = () => {
  if (isProduction()) return process.env.NEXT_PUBLIC_BASE_URL;
  return process.env.NEXT_PUBLIC_BASE_URL_DEV;
};

export const isProduction = () => {
  const env = process.env.NEXT_PUBLIC_ENV;
  return env === "PRO";
};

export const isDevelopment = () => {
  const env = process.env.NEXT_PUBLIC_ENV;
  return env === "DEV";
};



export const getMaxLoop = () => {
  const str = process.env.NEXT_PUBLIC_GAME_LOOP;
  if (!str) return 10;
  return parseInt(str);
}

export const getRefLink = () => {
  if (isProduction()) return `https://landtorn.com?ref=`;
  if (isDevelopment()) return 'https://dev.landtorn.com?ref=';
  return `http://localhost:3005/?ref=`;
}