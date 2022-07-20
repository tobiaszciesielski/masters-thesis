import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { NavLink, Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import AuthRequired from '~/components/AuthRequired/AuthRequired';
import UserArticlesToggle from '~/components/UserArticlesToggle/UserArticlesToggle';
import { useUser } from '~/context/user';
import { getUser } from '~/lib/session-utils';
import type { Profile } from '~/models/Profile';
import { makeRequest } from '~/services/api';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { username } = params;

  const user = await getUser(request);

  const response = await makeRequest(
    `/profiles/${username}`,
    'GET',
    {},
    user?.token
  );
  if (response.status === 404) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const profile = await response.json();
  return json(profile);
};

export default function ProfileDetails() {
  const [profile, setProfile] = useState(useLoaderData<Profile>());
  const user = useUser();

  const isMyProfile = profile.username === user?.username;

  const follow = async () => {
    const response = await makeRequest(
      `/profiles/${profile.username}/follow`,
      'POST',
      {},
      user?.token
    );

    const followingProfile = await response.json();
    setProfile(followingProfile);
  };

  const unfollow = async () => {
    const response = await makeRequest(
      `/profiles/${profile.username}/follow`,
      'DELETE',
      {},
      user?.token
    );

    const unfollowedProfile = await response.json();
    setProfile(unfollowedProfile);
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" alt="" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <AuthRequired>
                {isMyProfile ? (
                  <NavLink to="/settings">
                    <button className="btn btn-sm btn-outline-secondary action-btn">
                      <i className="ion-gear-a"></i>
                      &nbsp; Edit profile settings
                    </button>
                  </NavLink>
                ) : profile.following ? (
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={unfollow}
                  >
                    Unfollow {profile.username}
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={follow}
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {profile.username}
                  </button>
                )}
              </AuthRequired>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <UserArticlesToggle />

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
