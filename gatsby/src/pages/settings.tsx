import { GetServerData, navigate } from 'gatsby';
import React from 'react';
import { useLogin, useLogout, useUser } from '../../context/user';
import { getUser } from '../../lib/session';
import { makeRequest } from '../../services/api';

export const getServerData: GetServerData<any> = async (req) => {
  const user = await getUser(req);
  if (!user) {
    return {
      status: 301,
      headers: {
        Location: '/login',
      },
    };
  }

  return {
    props: { user },
  };
};

const Settings = (props: _PageProps<any>) => {
  const logout = useLogout();
  const login = useLogin();
  const user = useUser();

  const logoutUser = async () => {
    const request = await makeRequest(
      '/logout',
      'DELETE',
      {},
      props.serverData?.user?.token,
      true
    );

    if (request.status === 200) {
      logout();
      navigate('/');
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget) as any;
    const values = Object.fromEntries(formData);
    const response = await makeRequest(
      '/settings',
      'POST',
      values,
      user?.token,
      true
    );

    if (response.status === 200) {
      const updatedUser = await response.json();
      login({ ...user, ...updatedUser });
      navigate(`/profile/${updatedUser?.username}`);
    }
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={submit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={user?.image}
                    name="image"
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={user?.username}
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    defaultValue={user?.bio}
                    name="bio"
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={user?.email}
                    name="email"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>

            <hr />

            <button onClick={logoutUser} className="btn btn-outline-danger">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
