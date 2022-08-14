import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import AuthRequired from '~/components/AuthRequired';
import UserArticlesToggle from '~/components/UserArticlesToggle';
import { useUser } from '~/context/user';
import { getToken } from '~/lib/session-utils';
import type { Profile } from '~/models/Profile';

import { follow, getProfile, unfollow } from '~/services/profile';

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.username) {
    throw redirect('/');
  }

  const token = await getToken(request);

  const response = await getProfile(token, params.username);
  if (response.status === 404) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const profile = await response.json();
  return json(profile);
};

export default function ProfileDetails() {
  const userProfile = useLoaderData<Profile>();

  const [profile, setProfile] = useState(userProfile);
  const user = useUser();

  const isMyProfile = profile.username === user?.username;

  const followProfile = async () => {
    const response = await follow(user?.token, profile);

    const followingProfile = await response.json();
    setProfile(followingProfile);
  };

  const unfollowProfile = async () => {
    const response = await unfollow(user?.token, profile);

    const unfollowedProfile = await response.json();
    setProfile(unfollowedProfile);
  };

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

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
                    onClick={unfollowProfile}
                  >
                    Unfollow {profile.username}
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={followProfile}
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
