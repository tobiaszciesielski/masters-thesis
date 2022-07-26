import { redirect } from '@remix-run/node';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useTransition } from '@remix-run/react';

import { requireUserSession } from '~/lib/session-utils';
import type { User } from '~/models/User';
import { makeRequest } from '~/services/api';

interface UserData {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request);

  return json(user);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let values = Object.fromEntries(formData) as UserData;

  if (!values.password) {
    delete values['password'];
  }

  const authUser = await requireUserSession(request);

  const response = await makeRequest(
    '/user',
    'PUT',
    { user: values },
    authUser?.token
  );
  if (response.status !== 200) {
    return json({ error: 'Please try again' });
  }

  const { user } = await response.json();

  return redirect(`/profile/${user?.username}`);
};

export default function Settings() {
  const user = useLoaderData<User>();
  const transition = useTransition();

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form method="post">
              <fieldset>
                <fieldset
                  className="form-group"
                  disabled={transition.state === 'submitting'}
                >
                  <input
                    defaultValue={user.image}
                    name="image"
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset
                  className="form-group"
                  disabled={transition.state === 'submitting'}
                >
                  <input
                    defaultValue={user?.username}
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset
                  className="form-group"
                  disabled={transition.state === 'submitting'}
                >
                  <textarea
                    defaultValue={user.bio}
                    name="bio"
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset
                  className="form-group"
                  disabled={transition.state === 'submitting'}
                >
                  <input
                    defaultValue={user.email}
                    name="email"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset
                  className="form-group"
                  disabled={transition.state === 'submitting'}
                >
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button
                  disabled={transition.state === 'submitting'}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
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
