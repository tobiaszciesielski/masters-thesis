import { json, redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { makeRequest } from '~/services/api';
import type { User } from '~/models/User';
import { createSessionCookie } from '~/lib/session-utils';

interface LoginData {
  username?: string;
  password?: string;
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const values = Object.fromEntries(formData) as LoginData;

  const response = await makeRequest('/users/login', 'POST', { user: values });
  if (response.status !== 200) {
    return json({ error: 'Please try again' });
  }

  const { user }: { user: User } = await response.json();
  const cookie = await createSessionCookie(request, user.token);
  return redirect('/', {
    headers: {
      'Set-Cookie': cookie,
    },
  });
};

export default function Login() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="/register">Need an account?</a>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form method="post">
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
