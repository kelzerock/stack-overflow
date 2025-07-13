import { Methods } from '@enums';
import { LINK_TO_SERVER } from 'constants/global-constant';

type RequestBody = Record<string, string>;

export const requestBase = async (
  path: string,
  method: Methods,
  body: RequestBody
): Promise<Response> => {
  const response = await fetch(`${LINK_TO_SERVER}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response;
};
