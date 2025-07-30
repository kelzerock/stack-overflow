import { UrlPath } from '@enums';
import { AboutPage, ErrorPage, HomePage, RegistrationPage, SignInPage } from '@pages';
import App from 'App';
import { AccountPage } from 'pages/AccountPage/AccountPage';
import { UsersPage } from 'pages/Users/UsersPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: UrlPath.HOME,
            Component: HomePage,
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
          { path: UrlPath.ACCOUNT, Component: AccountPage },
          { path: UrlPath.NOT_FOUND, Component: ErrorPage },
        ],
      },
    ],
  },
]);
