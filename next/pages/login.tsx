import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { makeRequest } from '../services/api';

interface LoginData {
  username?: string;
  password?: string;
}

const Login: NextPage = () => {
  const router = useRouter();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData) as LoginData;

    const response = await makeRequest(
      '/login',
      'POST',
      values,
      undefined,
      true
    );

    if (response.status === 200) {
      router.push('/');
    }

    return;
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link href="/register">
                <a>Need an account?</a>
              </Link>
            </p>

            <form onSubmit={submit}>
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
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
