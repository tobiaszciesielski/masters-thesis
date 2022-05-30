import { json, LoaderFunction, redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import API_BASE from '~/services/api';
import type { User } from '~/models/User';
import { commitSession, getSession } from '~/session';

interface RegisterData {
  username?: string;
  password?: string;
  email?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  console.log(session.get('auth_token'));
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const values = Object.fromEntries(formData) as RegisterData;
  console.log(values);

  const data = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: values }),
  }).then((res) => res.json());

  const user = data?.user as User;

  const session = await getSession(request.headers.get('Cookie'));
  session.set('auth_token', user.token);
  console.log(session.get('auth_token'));

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Register() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="/login">Have an account?</a>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
