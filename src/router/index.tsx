import { UrlPath } from '@enums';
import {
  AboutPage,
  AccountPage,
  ErrorPage,
  HomePage,
  MyPostPage,
  PostPage,
  PostStub,
  QuestionsPage,
  RegistrationPage,
  SignInPage,
  UserPage,
  UsersPage,
} from '@pages';
import App from 'App';
import { createBrowserRouter } from 'react-router';
import { fetchAllPosts, fetchMyPosts, fetchSinglePost, rootLoader } from './loaders';
import { Loader } from 'components/Loader';
import { fetchAllUsers } from './loaders/fetchAllUsers';
import { fetchAllQuestions } from './loaders/fetchAllQuestions';

export const router = createBrowserRouter([
  {
    Component: App,
    loader: rootLoader,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: UrlPath.HOME,
            Component: HomePage,
            loader: fetchAllPosts,
          },
          {
            path: UrlPath.POST,
            Component: PostStub,
          },
          {
            path: `${UrlPath.POST}/:postID`,
            Component: PostPage,
            loader: async ({ params }) => fetchSinglePost(params),
          },
          {
            path: UrlPath.REGISTRATION,
            Component: RegistrationPage,
          },
          {
            path: UrlPath.SIGN_IN,
            Component: SignInPage,
          },
          { path: UrlPath.ABOUT, Component: AboutPage },
          {
            path: UrlPath.USERS,
            Component: UsersPage,
            loader: fetchAllUsers,
            hydrateFallbackElement: <Loader />,
          },
          { path: UrlPath.MY_POSTS, Component: MyPostPage, loader: fetchMyPosts },
          { path: `${UrlPath.USERS}/:profileID`, Component: UserPage },
          { path: UrlPath.ACCOUNT, Component: AccountPage },
          { path: UrlPath.QUESTIONS, Component: QuestionsPage, loader: fetchAllQuestions },
          { path: UrlPath.NOT_FOUND, Component: ErrorPage },
        ],
      },
    ],
  },
]);
