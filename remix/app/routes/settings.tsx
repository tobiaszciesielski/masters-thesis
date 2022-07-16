import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getUser, requireUserSession } from '~/lib/session-utils';
import type { User } from '~/models/User';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request);

  return json(user);
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);

  return json(user);
};

export default function Settings() {
  const user = useLoaderData<User>();

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={user.image}
                    name="image"
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={user.username}
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    defaultValue={user.bio}
                    name="bio"
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={user.email}
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

            <form action="/logout" method="post">
              <button className="btn btn-outline-danger">
                Or click here to logout.
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
