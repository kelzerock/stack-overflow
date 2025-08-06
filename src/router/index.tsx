import { UrlPath } from '@enums';
import {
  AboutPage,
  ErrorPage,
  HomePage,
  PostPage,
  PostStub,
  RegistrationPage,
  SignInPage,
} from '@pages';
import App from 'App';
import { AccountPage } from 'pages/AccountPage/AccountPage';
import { MyPostPage } from 'pages/MYPostPage/MyPostPage';
import { QuestionsPage } from 'pages/QuestionsPage/QuestionsPage';
import { UserPage } from 'pages/UserPage/UserPage';
import { UsersPage } from 'pages/Users/UsersPage';
import { createBrowserRouter } from 'react-router';
import { fetchSinglePost } from './loaders/fetchSinglePost';
import { fetchMyPosts } from './loaders/fetchMyPosts';
import { rootLoader } from './loaders/rootLoader';
import { fetchAllPosts } from './loaders/fetchAllPosts';

export const router = createBrowserRouter([
  {
    Component: App,
    loader: rootLoader,
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
          { path: UrlPath.USERS, Component: UsersPage },
          { path: UrlPath.MY_POSTS, Component: MyPostPage, loader: fetchMyPosts },
          { path: `${UrlPath.USERS}/:profileID`, Component: UserPage },
          { path: UrlPath.ACCOUNT, Component: AccountPage },
          { path: UrlPath.QUESTIONS, Component: QuestionsPage },
          { path: UrlPath.NOT_FOUND, Component: ErrorPage },
        ],
      },
    ],
  },
]);
