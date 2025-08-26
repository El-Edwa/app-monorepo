import { Button } from "@/components/ui/button";
interface User {
 id?: number,
    name?: string,
    username?: string,
    createdAt?: string,
    profilePicture?: string | null,
    coverPicture?: string | null,
    bio?: string | null,
    location?: string | null,
    website?: string | null,
    followers?: number | null,
    following?: number | null,
    posts?: number | null,
    birthday?: string | null,
    proffession?: string | null,
}
const SuggestedPeopleListItem = ({ user }: { user: User }) => {
  return (
    <div className="w-full flex items-start justify-between p-3 cursor-pointer">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <img
          src={
            user.profilePicture ||
            "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg"
          }
          alt={`${user.name}'s profile`}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center">
            <span className="font-bold text-sm sm:text-base text-white truncate">
              {user.name}
            </span>
          </div>
          <span className="text-gray-400 text-sm mb-2 truncate">
            {user.username}
          </span>
          {user.bio && (
            <p className="text-white text-sm leading-relaxed break-words">
              {user.bio}
            </p>
          )}
        </div>
      </div>
      <Button className="rounded-3xl px-[20px] cursor-pointer">Follow</Button>
    </div>
  );
};

export default SuggestedPeopleListItem;
