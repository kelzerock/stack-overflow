import { Methods } from '@enums';
import { ResponseGetQuestionsZ, ResponseGetSnippetsZ, ResponseGetUsers } from '@schemas';
import { User, UserFull } from '@types';
import { LINK_TO_SERVER } from 'constants/global-constant';
import { API } from 'models/enums/api';
import { Languages } from 'models/enums/languages';
import { Mark } from 'models/enums/mark';
import { ResponseGetSnippetZ } from 'schemas/responseGetSnippetZ';
import { UserStatisticDto } from 'schemas/userStatisticDto';
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
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
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
      `${LINK_TO_SERVER}${normalizedPath}${query ? `?${query.toString()}` : ''}`,
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

  public getUser = (id: string): Promise<Response> =>
    this.baseRequest({ path: `${API.USERS}/${id}`, method: Methods.GET });

  public getUserStatistic = async (id: string): Promise<z.infer<typeof UserStatisticDto>> => {
    const response = await this.baseRequest({
      path: `${API.USERS}/${id}/statistic`,
      method: Methods.GET,
    });
    const result = await response.json();
    return UserStatisticDto.parse(result.data);
  };

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

  public getSnippets = async (
    query?: URLSearchParams
  ): Promise<z.infer<typeof ResponseGetSnippetsZ>> => {
    const response = await this.baseRequest({ path: API.SNIPPETS, method: Methods.GET, query });
    const result = await response.json();
    return ResponseGetSnippetsZ.parse(result.data);
  };

  public addSnippets = (body: { code: string; language: Languages }): Promise<Response> =>
    this.baseRequest({ path: API.SNIPPETS, method: Methods.POST, body });

  public getLanguages = (): Promise<Response> =>
    this.baseRequest({ path: API.LANG, method: Methods.GET });

  public getSnippet = async (id: string): Promise<z.infer<typeof ResponseGetSnippetZ>> => {
    const response = await this.baseRequest({ path: `${API.SNIPPETS}/${id}`, method: Methods.GET });
    const result = await response.json();
    return ResponseGetSnippetZ.parse(result);
  };

  public updateSnippet = (
    id: string,
    body: { code: string; language: Languages }
  ): Promise<Response> =>
    this.baseRequest({ path: `${API.SNIPPETS}/${id}`, method: Methods.GET, body });

  public deleteSnippet = (id: string): Promise<Response> =>
    this.baseRequest({ path: `${API.SNIPPETS}/${id}`, method: Methods.DELETE });

  public markSnippet = (id: string, body: { mark: Mark }): Promise<Response> =>
    this.baseRequest({ path: `${API.SNIPPETS}/${id}/mark`, method: Methods.POST, body });

  public addComment = (body: { content: string; snippetId: string }): Promise<Response> =>
    this.baseRequest({ path: API.COMMENTS, method: Methods.POST, body });

  public updateComment = (id: string, body: { content: string }): Promise<Response> =>
    this.baseRequest({ path: `${API.COMMENTS}/${id}`, method: Methods.PATCH, body });

  public deleteComment = (id: string): Promise<Response> =>
    this.baseRequest({ path: `${API.COMMENTS}/${id}`, method: Methods.DELETE });

  public getQuestions = async (
    query?: URLSearchParams
  ): Promise<z.infer<typeof ResponseGetQuestionsZ>> => {
    const response = await this.baseRequest({ path: API.QUESTIONS, method: Methods.GET, query });
    const result = await response.json();
    return ResponseGetQuestionsZ.parse(result.data);
  };

  public addQuestion = (body: {
    title: string;
    description: string;
    attachedCode: string;
  }): Promise<Response> => this.baseRequest({ path: API.QUESTIONS, method: Methods.POST, body });

  public getQuestion = (id: string): Promise<Response> =>
    this.baseRequest({ path: `${API.QUESTIONS}/${id}`, method: Methods.GET });

  public updateQuestion = (
    id: string,
    body: { title: string; description: string; attachedCode: string }
  ): Promise<Response> =>
    this.baseRequest({ path: `${API.QUESTIONS}/${id}`, method: Methods.PATCH, body });

  public deleteQuestion = (id: string): Promise<Response> =>
    this.baseRequest({ path: `${API.QUESTIONS}/${id}`, method: Methods.DELETE });

  public getAnswers = (): Promise<Response> =>
    this.baseRequest({ path: API.ANSWERS, method: Methods.GET });

  public addAnswer = (body: { content: string; questionId: string }): Promise<Response> =>
    this.baseRequest({ path: API.ANSWERS, method: Methods.POST, body });

  public markAnswer = (id: string, state: 'correct' | 'incorrect'): Promise<Response> =>
    this.baseRequest({ path: `${API.ANSWERS}/${id}/state/${state}`, method: Methods.PUT });

  public updateAnswer = (id: string, body: { content: string }): Promise<Response> =>
    this.baseRequest({ path: `${API.ANSWERS}/${id}`, method: Methods.PATCH, body });

  public deleteAnswers = (id: string): Promise<Response> =>
    this.baseRequest({ path: `${API.ANSWERS}/${id}`, method: Methods.DELETE });
}

export const rootRequest = new RootRequest();

// 5
// :
// {id: '169', content: 'test answer', isCorrect: false}
// 6
// :
// {id: '168', content: 'test answer', isCorrect: false}
