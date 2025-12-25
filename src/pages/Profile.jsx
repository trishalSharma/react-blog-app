import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import profileService from "../appwrite/profile";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useSelector } from "react-redux";

export default function Profile() {
  const { username } = useParams();
  const authUser = useSelector(state => state.auth.userData);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let data;

        if (username) {
          // Visiting /profile/:username
          data = await profileService.getProfileByUsername(username);
          
        } else if (authUser) {
          // Visiting /profile → load own profile
          data = await profileService.getProfileByUserId(authUser.$id);
        }

        setProfile(data);
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, authUser]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>User not found</p>;

  const isOwner = authUser?.$id === profile.userId;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileHeader profile={profile} isOwner={isOwner} />
    </div>
  );
}
