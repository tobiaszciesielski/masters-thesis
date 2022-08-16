import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Document } from './components/Document';
import { Layout } from './components/Layout';
import { UserProvider } from './context/user';
import { getUser } from './lib/session-utils';

export default function App() {
  const user = useLoaderData();

  return (
    <Document>
      <UserProvider user={user}>
        <Layout />
      </UserProvider>
    </Document>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return user;
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Conduit',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  {
    // icons
    rel: 'stylesheet',
    type: 'text/css',
    href: '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
  },
  {
    // fonts
    rel: 'stylesheet',
    type: 'text/css',
    href: '//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic',
  },
  {
    // styles
    rel: 'stylesheet',
    href: '//demo.productionready.io/main.css',
  },
];
