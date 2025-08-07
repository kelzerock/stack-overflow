export const getURLSearchParams = (url: string): URLSearchParams => {
  const queryString = url.split('?')[1];
  return new URLSearchParams(queryString);
};
