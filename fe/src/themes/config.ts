export const MAX_WIDTH = 1155;
export const PADDING_X = "160px";
export const PADDING_X_MB = "10px"

export const fonts = {
  Mirza: 'Mirza',
  Actor: 'Actor'
}

export const isServer = () => typeof window === 'undefined';
export const getWowJs = (): any => {
  const WOW = !isServer() ? require('wow.js') : null;
  return new WOW().init();
}
