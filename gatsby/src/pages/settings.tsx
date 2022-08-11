import { GetServerData, navigate } from 'gatsby';
import React from 'react';
import { useLogout } from '../../context/user';
import { getUser } from '../../lib/session';
import { makeRequest } from '../../services/api';

interface UserData {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export const getServerData: GetServerData<any> = async (req) => {
  const user = await getUser(req);
  if (!user) {
    navigate('/');
    return {};
  }

  return {
    props: { user },
  };
};

const Settings = (props: _PageProps<any>) => {
  const logout = useLogout();

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

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={props?.serverData?.user?.image}
                    name="image"
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={props?.serverData?.user?.username}
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    defaultValue={props?.serverData?.user?.bio}
                    name="bio"
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={props?.serverData?.user?.email}
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
