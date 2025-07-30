import { Methods } from '@enums';
import { ResponseGetUsers } from '@schemas';
import { User, UserFull } from '@types';
import { LINK_TO_SERVER } from 'constants/global-constant';
import { API } from 'models/enums/api';
import { Languages } from 'models/enums/languages';
import { Mark } from 'models/enums/mark';
import z from 'zod';

type RequestBody = Record<string, unknown>;
type BaseRequest = {
  path: string;
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
    this.baseRequest({ path: API.AUTH, method: Methods.GET });

  public login = (user: User): Promise<Response> =>
    this.baseRequest({ path: API.LOGIN, method: Methods.POST, body: user });

  public logout = (): Promise<Response> =>
    this.baseRequest({ path: API.LOGOUT, method: Methods.POST });

  public registration = (user: User): Promise<Response> =>
    this.baseRequest({ path: API.REGISTER, method: Methods.POST, body: user });

  public getUsers = async (query?: URLSearchParams): Promise<z.infer<typeof ResponseGetUsers>> => {
    const response = await this.baseRequest({ path: API.USERS, method: Methods.GET, query });
    const result = await response.json();
    return ResponseGetUsers.parse(result.data);
  };

  public getUser = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.USERS}/${id}`, method: Methods.GET });

  public getUserStatistic = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.USERS}/${id}/statistic`, method: Methods.GET });

  public getMe = (): Promise<Response> => this.baseRequest({ path: API.ME, method: Methods.GET });

  public patchMe = (body: Pick<UserFull, 'username'>): Promise<Response> =>
    this.baseRequest({
      path: API.ME,
      method: Methods.PATCH,
      body,
    });

  public deleteMe = (): Promise<Response> =>
    this.baseRequest({ path: API.ME, method: Methods.DELETE });

  public patchPassword = (body: { oldPassword: string; newPassword: string }): Promise<Response> =>
    this.baseRequest({ path: API.PATCH_PASS, method: Methods.PATCH, body });

  public getSnippets = (): Promise<Response> =>
    this.baseRequest({ path: API.SNIPPETS, method: Methods.GET });

  public addSnippets = (body: { code: string; language: Languages }): Promise<Response> =>
    this.baseRequest({ path: API.SNIPPETS, method: Methods.POST, body });

  public getLanguages = (): Promise<Response> =>
    this.baseRequest({ path: API.LANG, method: Methods.GET });

  public getSnippet = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.SNIPPETS}/${id}`, method: Methods.GET });

  public updateSnippet = (
    id: number,
    body: { code: string; language: Languages }
  ): Promise<Response> =>
    this.baseRequest({ path: `${API.SNIPPETS}/${id}`, method: Methods.GET, body });

  public deleteSnippet = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.SNIPPETS}/${id}`, method: Methods.DELETE });

  public markSnippet = (id: number, body: { mark: Mark }): Promise<Response> =>
    this.baseRequest({ path: `${API.SNIPPETS}/${id}/mark`, method: Methods.POST, body });

  public addComment = (body: { content: string; snippetId: number }): Promise<Response> =>
    this.baseRequest({ path: API.COMMENTS, method: Methods.POST, body });

  public updateComment = (id: number, body: { content: string }): Promise<Response> =>
    this.baseRequest({ path: `${API.COMMENTS}/${id}`, method: Methods.PATCH, body });

  public deleteComment = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.COMMENTS}/${id}`, method: Methods.DELETE });

  public getQuestions = (query?: URLSearchParams): Promise<Response> =>
    this.baseRequest({ path: API.QUESTIONS, method: Methods.GET, query });

  public addQuestion = (body: {
    title: string;
    description: string;
    attachedCode: string;
  }): Promise<Response> => this.baseRequest({ path: API.QUESTIONS, method: Methods.POST, body });

  public getQuestion = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.QUESTIONS}/${id}`, method: Methods.GET });

  public updateQuestion = (
    id: number,
    body: { title: string; description: string; attachedCode: string }
  ): Promise<Response> =>
    this.baseRequest({ path: `${API.QUESTIONS}/${id}`, method: Methods.POST, body });

  public deleteQuestion = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.QUESTIONS}/${id}`, method: Methods.DELETE });

  public getAnswers = (): Promise<Response> =>
    this.baseRequest({ path: API.ANSWERS, method: Methods.GET });

  public addAnswer = (body: { content: string; questionId: number }): Promise<Response> =>
    this.baseRequest({ path: API.ANSWERS, method: Methods.POST, body });

  public markAnswer = (id: number, state: 'correct' | 'incorrect'): Promise<Response> =>
    this.baseRequest({ path: `${API.ANSWERS}/${id}/state/${state}`, method: Methods.PUT });

  public updateAnswer = (id: number, body: { content: string }): Promise<Response> =>
    this.baseRequest({ path: `${API.ANSWERS}/${id}`, method: Methods.PATCH, body });

  public deleteAnswers = (id: number): Promise<Response> =>
    this.baseRequest({ path: `${API.ANSWERS}/${id}`, method: Methods.DELETE });
}

export const rootRequest = new RootRequest();
