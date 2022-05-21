import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import Layout from './components/Layout/Layout';

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

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
