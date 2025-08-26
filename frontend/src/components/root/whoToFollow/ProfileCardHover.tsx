import { Button } from "@/components/ui/button";
type User={
  id?: number;
  name?: string;
  username?: string;
  createdAt?: string;
  profilePicture?: string | null;
  coverPicture?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  followers?: number | null | undefined;
  following?: number | null | undefined;
  posts?: number | null | undefined;
  birthday?: string | null | undefined;
  profession?: string | null | undefined;
}
const ProfileCardHover = ({ user }: { user: User }) => {
  const formatCount = (count: number | null | undefined) => {
    if (count === null || count === undefined) return "0";
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  return (
    <div className="bg-black border border-gray-700 rounded-2xl p-4 w-80 shadow-2xl">
      {/* Header with profile image and follow button */}
      <div className="flex items-start justify-between mb-3">
        <img
          src={
            user.profilePicture ||
            "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg"
          }
          alt={`${user.name}'s profile`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <Button className="rounded-3xl px-[20px] cursor-pointer">Follow</Button>
      </div>

      {/* Name and verification */}
      <div className="mb-2">
        <div className="flex items-center gap-1 mb-1">
          <h3 className="text-white font-bold text-lg">{user.name}</h3>
        </div>
        <p className="text-gray-400 text-sm">{user.username}</p>
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="mb-4">
          <p className="text-white text-sm leading-relaxed">{user.bio}</p>
        </div>
      )}

      {/* Followers and Following */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <span className="text-white font-bold text-sm">
            {formatCount(user.following)}
          </span>
          <span className="text-gray-400 text-sm">Following</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-white font-bold text-sm">
            {formatCount(user.followers)}
          </span>
          <span className="text-gray-400 text-sm">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardHover;
