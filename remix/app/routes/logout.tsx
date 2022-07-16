import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { destroySession, getSession } from '~/session';

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export const loader: LoaderFunction = async () => {
  return redirect('/');
};
