import { Methods } from '@enums';
import { LINK_TO_SERVER } from 'constants/global-constant';
import { API } from 'models/enums/api';

type RequestBody = Record<string, string>;
type BaseRequest = {
  path: API;
  method: Methods;
  body?: RequestBody;
  query?: URLSearchParams;
};

class RootRequest {
  private baseRequest = async ({ path, method, body, query }: BaseRequest): Promise<Response> => {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method !== Methods.GET && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${LINK_TO_SERVER}${path}${query ? `?${query.toString()}` : ''}`,
      options
    );

    if (!response.ok) {
      const data = await response.json();
      throw Object.assign(new Error(`Request failed with status ${response.status}`), {
        body: data,
      });
    }
    return response;
  };

  public authGet = (): Promise<Response> =>
    this.baseRequest({ path: API.auth, method: Methods.GET });
}

export const rootRequest = new RootRequest();
