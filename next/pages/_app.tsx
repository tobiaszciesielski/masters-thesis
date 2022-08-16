import { NextPage } from 'next';
import type { AppContext, AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { UserProvider } from '../context/user';
import { getIronSession } from 'iron-session';
import App from 'next/app';
import { User } from '../models/User';
import { getUserWithToken } from '../services/auth';
import { sessionOptions } from '../lib/session';
import { Layout } from '../components/Layout';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  user: User | null;
};

function MyApp({ Component, pageProps, user }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <UserProvider user={user}>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: any = await App.getInitialProps(appContext);

  const {
    ctx: { res, req },
  } = appContext;
  if (!req || !res) {
    return appProps;
  }

  const { user } = await getIronSession(req, res, sessionOptions);
  if (!user) {
    return appProps;
  }

  const authUser = await getUserWithToken(user?.token);

  if (authUser) {
    return {
      ...appProps,
      user: authUser,
    };
  }

  return appProps;
};

export default MyApp;
