export const isResponseHasData = (data: unknown): data is { data: unknown } => {
  return data &&
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    typeof data.data === 'object' &&
    data.data !== null
    ? true
    : false;
};
