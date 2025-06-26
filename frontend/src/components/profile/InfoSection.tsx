import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import { GrLocation } from "react-icons/gr";
import { PiBalloon } from "react-icons/pi";
import { LuBriefcaseBusiness } from "react-icons/lu";

const InfoSection = ({ user }: any) => {
  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-0 mb-4">
      <div className="pt-1 pb-3 sm:pt-2 sm:pb-4">
        <h2 className="text-lg lg:text-xl font-bold break-words">
          {user.name}
        </h2>
        <p className="text-sm sm:text-base text-[#676d70] break-words">
          {user.username}
        </p>
      </div>

      <div className="mb-3 sm:mb-4">
        <p
          dir="auto"
          className="text-sm sm:text-base leading-relaxed break-words"
        >
          {user.bio}
        </p>
      </div>

      <div className="flex flex-wrap max-w-[500px] gap-x-2">
        {user.proffession && (
          <div className="flex gap-1.5 items-center min-w-0">
            <LuBriefcaseBusiness className="flex-shrink-0 text-[#676d70] text-sm sm:text-base" />
            <span className="text-[#676d70] text-sm sm:text-base truncate">
              {user.proffession}
            </span>
          </div>
        )}

        {user.location && (
          <div className="flex gap-1.5 items-center min-w-0">
            <GrLocation className="flex-shrink-0 text-[#676d70] text-sm sm:text-base" />
            <span className="text-[#676d70] text-sm sm:text-base truncate">
              {user.location}
            </span>
          </div>
        )}

        {user.birthday && (
          <div className="flex gap-1.5 items-center min-w-0">
            <PiBalloon className="flex-shrink-0 text-[#676d70] text-sm sm:text-base" />
            <span className="text-[#676d70] text-sm sm:text-base truncate">
              Born {format(new Date(user.birthday), "MMMM d")}
            </span>
          </div>
        )}

        <div className="flex gap-1.5 items-center min-w-0">
          <SlCalender className="flex-shrink-0 text-[#676d70] text-sm sm:text-base" />
          <span className="text-[#676d70] text-sm sm:text-base truncate">
            Joined {format(new Date(user.createdAt), "MMM yyyy")}
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{user.following}</span>
            <span className="text-[#676d70] text-sm">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{user.followers}</span>
            <span className="text-[#676d70] text-sm">Followers</span>
          </div>
        </div>
      </div>
      <p className="text-[#676d70] text-sm mt-2">
        Not followed by anyone you’re following
        <br />
      </p>
    </div>
  );
};

export default InfoSection;
