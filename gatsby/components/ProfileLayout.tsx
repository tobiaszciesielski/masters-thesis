import { Link } from 'gatsby';
import React, { ReactNode, useEffect, useState } from 'react';
import { useUser } from '../context/user';
import { Profile } from '../models/Profile';
import { follow, unfollow } from '../services/profile';
import { AuthRequired } from './AuthRequired';
import { UserArticlesToggle } from './UserArticlesToggle';

export interface ProfileLayoutProps {
  userProfile: Profile;
  children: ReactNode;
}

export function ProfileLayout(props: ProfileLayoutProps) {
  const [profile, setProfile] = useState(props.userProfile);
  const user = useUser();

  const isMyProfile = profile?.username === user?.username;

  const followProfile = async () => {
    const response = await follow(user, profile);

    const followingProfile = await response.json();
    setProfile(followingProfile);
  };

  const unfollowProfile = async () => {
    const response = await unfollow(user, profile);

    const unfollowedProfile = await response.json();
    setProfile(unfollowedProfile);
  };

  useEffect(() => {
    setProfile(props.userProfile);
  }, [props.userProfile]);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile?.image} className="user-img" alt="" />
              <h4>{profile?.username}</h4>
              <p>{profile?.bio}</p>

              <AuthRequired>
                {isMyProfile ? (
                  <Link to="/settings/">
                    <button className="btn btn-sm btn-outline-secondary action-btn">
                      <i className="ion-gear-a"></i>
                      &nbsp; Edit profile settings
                    </button>
                  </Link>
                ) : profile?.following ? (
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
                    &nbsp; Follow {profile?.username}
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
            <UserArticlesToggle profileName={profile?.username} />

            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
