import { Link } from "react-router-dom";
import profileService from "../../appwrite/profile";

export default function ProfileHeader({ profile, isOwner }) {
  if (!profile) return null;

  const avatarUrl = profile.avatarId
    ? profileService.getAvatarPreview(profile.avatarId)
    : "/avatar-placeholder.png";

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start 
                    border-b border-white/10 pb-6">

      {/* Avatar */}
      <div className="shrink-0">
        <img
          src={avatarUrl}
          alt="Profile avatar"
          className="w-28 h-28 rounded-full object-cover 
                     border border-white/10"
        />
      </div>

      {/* Profile Info */}
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">
          @{profile.username}
        </h1>

        {profile.bio ? (
          <p className="mt-2 text-gray-400 max-w-xl leading-relaxed">
            {profile.bio}
          </p>
        ) : (
          isOwner && (
            <p className="mt-2 text-gray-500 italic">
              Add a bio to tell people about yourself
            </p>
          )
        )}

        {/* Actions */}
        {isOwner && (
          <div className="mt-4">
            <Link
              to={`/profile/${profile.username}/edit`}
              className="inline-flex items-center gap-2
                         px-4 py-2 rounded-md
                         bg-white/10 hover:bg-white/15
                         text-sm font-medium transition"
            >
              Edit profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
