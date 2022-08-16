import { Link, navigate } from 'gatsby';
import React from 'react';
import { useLogin } from '../../context/user';
import { makeRequest } from '../../services/api';

interface RegisterData {
  username?: string;
  password?: string;
  email?: string;
}

const Register = () => {
  const login = useLogin();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget) as any;
    const values = Object.fromEntries(formData) as RegisterData;

    const response = await makeRequest(
      '/register',
      'POST',
      values,
      undefined,
      true
    );

    if (response.status === 200) {
      const { user } = await response.json();
      login(user);
      navigate('/');
    }

    return;
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <form onSubmit={submit}>
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
};

export default Register;
